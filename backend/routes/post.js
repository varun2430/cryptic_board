import express from "express";
import { getTopPosts, getPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getTopPosts);
router.get("/:topic/", getPosts);

export default router;
