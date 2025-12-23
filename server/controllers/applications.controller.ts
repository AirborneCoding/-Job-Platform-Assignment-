import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import type { UploadedFile } from "express-fileupload";
import CustomError from "../errors/index.js";
import type { Request, Response } from "express";
import { db } from "../db/connect";
import { applications } from "../schemas/positions.schemas";
import { StatusCodes } from "http-status-codes";

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const allApplications = await db.select().from(applications);
    res.status(StatusCodes.OK).json(allApplications);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error", error });
  }
};

export const applyToPosition = async (req: Request, res: Response) => {
  try {
    const { positionId, fullName, email, spontaneous: spontaneousRaw } = req.body;

    if (!fullName || !email) {
      throw new CustomError.BadRequestError("Full name and email are required");
    }

    if (!spontaneousRaw && !positionId) {
      throw new CustomError.BadRequestError(
        "Position ID is required for non-spontaneous applications"
      );
    }

    const spontaneous = spontaneousRaw === "true" || spontaneousRaw === "1";

    if (!req.files || !req.files.resume) {
      throw new CustomError.BadRequestError("Resume file is required");
    }

    const resumeFile: UploadedFile = Array.isArray(req.files.resume)
      ? (req.files.resume[0] as UploadedFile)
      : (req.files.resume as UploadedFile);

    const resumePath = await handleResumeUpload(resumeFile);

    const newApplication = await db
      .insert(applications)
      .values({
        positionId: positionId ? Number(positionId) : null,
        fullName,
        email,
        spontaneous,
        resumePath,
      })
      .returning();

    res.status(StatusCodes.CREATED).json(newApplication[0]);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
};

// *for upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, "../../upload_resumes");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const handleResumeUpload = async (file?: UploadedFile) => {
  if (!file) {
    throw new CustomError.BadRequestError("No resume file provided");
  }

  if (file.mimetype !== "application/pdf") {
    throw new CustomError.BadRequestError("Only PDF files are allowed");
  }

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    throw new CustomError.BadRequestError("Resume must be smaller than 2MB");
  }

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileName = `resume-${uniqueSuffix}.pdf`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  await file.mv(filePath);

  return `/upload_resumes/${fileName}`;
};