import { s3Client } from "../server.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import File from "../models/File.js";

/* GET S3 OBJECT URL */
export const getObjectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.find({ parentId: id });
    const objectKey = file[0].objectKey;
    // const params = {
    //   Bucket: process.env.S3_BUCKET,
    //   Key: objectKey,
    // };
    // const command = new GetObjectCommand(params);
    // const url = await getSignedUrl(s3Client, command);
    const url = "https://picsum.photos/1920/1080";
    res.status(200).json({ url: url });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
