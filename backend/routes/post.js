import express from "express";
import { getTopPosts, getPosts, getStats } from "../controllers/post.js";

const router = express.Router();

router.get("/", getTopPosts);
router.get("/stats", getStats);
router.get("/:topic", getPosts);

export default router;
