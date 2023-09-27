import express from "express";
import { getReplys, postReply } from "../controllers/reply.js";

const router = express.Router();

router.get("/:postId", getReplys);
router.post("/", postReply);

export default router;
