import crypto from "crypto";
import { s3Client } from "../server.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const response = await Post.find({});
    res.status(200).json(response);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const sendPost = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const timestamp = new Date().getTime();
    const objectKey = `${timestamp}-${crypto.randomUUID().replace(/-/g, "")}`;
    const fileName = req.file.originalname;
    const contentType = req.file.mimetype;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: objectKey,
      Body: req.file.buffer,
    };
    const command = new PutObjectCommand(params);
    const awsRes = await s3Client.send(command);
    const newPost = new Post({
      subject,
      description,
      objectKey,
      fileName,
      contentType,
    });
    const mongoRes = await newPost.save();
    const post = await Post.find({ _id: newPost._id });
    res.status(201).json({
      post,
    });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
