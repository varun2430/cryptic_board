import { Schema, model } from "mongoose";

const fileSchema = Schema(
  {
    parentId: {
      type: String,
    },
    objectKey: {
      type: String,
    },
    name: {
      type: String,
    },
    contentType: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  { timestamps: true }
);

const File = model("File", fileSchema);
export default File;
