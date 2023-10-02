import express from "express";
import { verifyApiKey } from "../middleware/security.js";
import { getReplys, getStats, postReply } from "../controllers/reply.js";

const router = express.Router();

router.get("/stats", verifyApiKey, getStats);
router.get("/:postId", verifyApiKey, getReplys);
router.post("/", verifyApiKey, postReply);

export default router;
