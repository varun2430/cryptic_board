import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import Post from "./models/Post.js";
import File from "./models/File.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 50 * 1024 * 1024,
    fileSize: 50 * 1024 * 1024,
  },
});

const getPosts = async (req, res) => {
  const response = await Post.find({});
  res.json(response);
};

const getFile = async (req, res) => {
  const { id } = req.params;
  const response = await File.find({ parentId: id });
  res.json(response);
};

const sendPost = async (req, res) => {
  const { subject, description } = req.body;
  const fileName = req.file.originalname;
  const contentType = req.file.mimetype;
  const data = req.file.buffer.toString("base64");

  const newPost = new Post({
    subject,
    description,
  });
  const savedPost = await newPost.save();

  const parentId = savedPost._id;
  const newFile = new File({
    parentId,
    fileName,
    contentType,
    data,
  });
  const savedFile = await newFile.save();

  res.json(savedPost);
};

app.get("/", getPosts);
app.get("/file/:id", getFile);
app.post("/", upload.single("file"), sendPost);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`error connecting: ${err}`);
  });
