import crypto from "crypto";
import { s3Client } from "../server.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Post from "../models/Post.js";
import File from "../models/File.js";

export const getStats = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.status(200).json({ count: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET POSTS */
export const getPosts = async (req, res) => {
  try {
    const { topic } = req.params;
    try {
      const response = await Post.find({ topic: topic });
      res.status(200).json(response);
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET POPULAR POSTS */
export const getTopPosts = async (req, res) => {
  try {
    const response = await Post.find({}).sort({ replyCount: -1 }).limit(8);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPLOAD POSTS */
export const postPost = async (req, res) => {
  try {
    const { topic, subject, description } = req.body;
    const timestamp = new Date().getTime();
    const objectKey = `${timestamp}-${crypto.randomUUID().replace(/-/g, "")}`;
    try {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: objectKey,
        Body: req.file.buffer,
      };
      const command = new PutObjectCommand(params);
      const awsRes = await s3Client.send(command);
      const newPost = new Post({
        topic,
        subject,
        description,
        replyCount: 0,
      });
      const npostRes = await newPost.save();
      const newFile = new File({
        parentId: newPost._id,
        objectKey,
        name: req.file.originalname,
        size: Number(req.file.size),
        contentType: req.file.mimetype,
      });
      const nfileRes = await newFile.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
