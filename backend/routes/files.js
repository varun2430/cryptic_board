import express from "express";
import { getObjectUrl } from "../controllers/files.js";

const router = express.Router();

router.get("/:objectKey", getObjectUrl);

export default router;
