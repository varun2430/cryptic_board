import express from "express";
import { getReplys, getStats, postReply } from "../controllers/reply.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/:postId", getReplys);
router.post("/", postReply);

export default router;
