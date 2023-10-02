import express from "express";
import { verifyApiKey } from "../middleware/security.js";
import { getObjectUrl, getStats } from "../controllers/file.js";

const router = express.Router();

router.get("/stats", verifyApiKey, getStats);
router.get("/:id", verifyApiKey, getObjectUrl);

export default router;
