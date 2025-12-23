import express from "express";
import {
 applyToPosition,
 getAllApplications,
} from "../controllers/applications.controller";

const router = express.Router();

router.get("/", getAllApplications);
router.post("/apply", applyToPosition);


export default router;
