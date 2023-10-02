import express from "express";
import { verifyApiKey } from "../middleware/security.js";
import { getTopPosts, getPosts, getStats } from "../controllers/post.js";

const router = express.Router();

router.get("/", verifyApiKey, getTopPosts);
router.get("/stats", verifyApiKey, getStats);
router.get("/:topic", verifyApiKey, getPosts);

export default router;
