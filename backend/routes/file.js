import express from "express";
import { getObjectUrl, getStats } from "../controllers/file.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/:id", getObjectUrl);

export default router;
