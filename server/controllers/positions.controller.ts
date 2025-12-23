import type { Request, Response } from "express";
import { db } from "../db/connect";
import { positions } from "../schemas/positions.schemas";
import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

export const createPosition = async (req: Request, res: Response) => {
  try {
    const { title, department, workType, location, description } = req.body;
    if (!title || !department || !workType || !location || !description) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
    const newPosition = await db
      .insert(positions)
      .values({ title, department, workType, location, description })
      .returning();
    res.status(201).json(newPosition[0]);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const getAllPositions = async (req: Request, res: Response) => {
  try {
    const allPositions = await db.select().from(positions);
    res.status(StatusCodes.OK).json(allPositions);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error", error });
  }
};

export const getOnePosition = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).json({ msg: "Position ID is required" });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "Invalid Position ID" });
    }

    const position = await db
      .select()
      .from(positions)
      .where(eq(positions.id, id));

    if (position.length === 0) {
      return res.status(404).json({ msg: "Position not found" });
    }

    res.status(200).json(position[0]);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).json({ msg: "Position ID is required" });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "Invalid Position ID" });
    }

    const { title, department, workType, location, description } = req.body;

    const updatedPosition = await db
      .update(positions)
      .set({
        title,
        department,
        workType,
        location,
        description,
        updatedAt: new Date(),
      })
      .where(eq(positions.id, id))
      .returning();

    if (updatedPosition.length === 0) {
      return res.status(404).json({ msg: "Position not found" });
    }

    res.status(200).json(updatedPosition[0]);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const deletePosition = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).json({ msg: "Position ID is required" });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "Invalid Position ID" });
    }

    const deletedPosition = await db
      .delete(positions)
      .where(eq(positions.id, id))
      .returning();

    if (deletedPosition.length === 0) {
      return res.status(404).json({ msg: "Position not found" });
    }

    res.status(200).json({ msg: "Position deleted", deleted: deletedPosition[0] });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
