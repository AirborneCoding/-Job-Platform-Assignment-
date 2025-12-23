import express from "express";
import {
  getAllPositions,
  createPosition,
  getOnePosition,
  updatePosition,
  deletePosition,
} from "../controllers/positions.controller";

const router = express.Router();

router.get("/", getAllPositions);
router.post("/", createPosition);
router.get("/:id", getOnePosition);
router.patch("/:id", updatePosition);
router.delete("/:id", deletePosition);

export default router;
