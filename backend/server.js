import fs from "fs";
import https from "https";
import express from "express";
import { S3Client } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { postPost } from "./controllers/post.js";
import { verifyApiKey } from "./middleware/security.js";
import postRoutes from "./routes/post.js";
import fileRoutes from "./routes/file.js";
import replyRoutes from "./routes/reply.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fileSize: 10 * 1024 * 1024,
  },
});

/* ROUTES WITH FILES */
app.post("/api/post/", upload.single("file"), verifyApiKey, postPost);

/* ROUTES */
app.use("/api/post", postRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/reply", replyRoutes);

const server = https.createServer({ key: key, cert: cert }, app);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`error connecting: ${err}`);
  });
