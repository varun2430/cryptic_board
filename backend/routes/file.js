import express from "express";
import { getObjectUrl } from "../controllers/file.js";

const router = express.Router();

router.get("/:id", getObjectUrl);

export default router;
