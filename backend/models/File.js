import { Schema, model } from "mongoose";

const fileSchema = Schema(
  {
    parentId: {
      type: String,
    },
    fileName: {
      type: String,
    },
    contentType: {
      type: String,
    },
    data: {
      type: String,
    },
  },
  { timestamps: true }
);

const File = model("File", fileSchema);
export default File;
