import { s3Client } from "../server.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getObjectUrl = async (req, res) => {
  try {
    const { objectKey } = req.params;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: objectKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command);
    res.status(200).json({ url: url });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
