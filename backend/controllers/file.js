import { s3Client } from "../server.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import File from "../models/File.js";

/* GET S3 OBJECT URL */
export const getObjectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const file = await File.find({ parentId: id });
      const objectKey = file[0].objectKey;
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: objectKey,
      };
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(s3Client, command);
      // const url = "https://picsum.photos/1920/1080";
      res.status(200).json({ url: url });
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET FILE STATS */
export const getStats = async (req, res) => {
  try {
    try {
      const response = await File.aggregate([
        {
          $group: {
            _id: null,
            totalSize: { $sum: "$size" },
          },
        },
      ]);

      let totalSize = 0;
      if (response.length > 0) {
        totalSize = response[0].totalSize;
      }

      if (!+totalSize) {
        totalSize = "0 B";
      } else {
        const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(totalSize) / Math.log(1024));
        totalSize = `${parseFloat(
          (totalSize / Math.pow(1024, i)).toFixed(0)
        )} ${sizes[i]}`;
      }

      res.status(200).json({ totalSize: totalSize });
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
