import { Schema, model } from "mongoose";

const postSchema = Schema(
  {
    // topic: {
    //   type: String,
    // },
    subject: {
      type: String,
    },
    description: {
      type: String,
    },
    objectKey: {
      type: String,
    },
    fileName: {
      type: String,
    },
    contentType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
