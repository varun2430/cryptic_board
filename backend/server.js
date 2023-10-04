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

const options = {
  cert: fs.readFileSync("/etc/ssl/certificate.crt"),
  ca: fs.readFileSync("/etc/ssl/ca_bundle.crt"),
  key: fs.readFileSync("/etc/ssl/private/private.key"),
};

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

/* HEALTH CHECK ENDPOINT */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ENDPOINT WITH FILES */
app.post("/api/post/", upload.single("file"), verifyApiKey, postPost);

/* ROUTES */
app.use("/api/post", postRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/reply", replyRoutes);

const server = https.createServer(options, app);

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
