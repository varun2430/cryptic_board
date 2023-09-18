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
    // imgFileName: {
    //   type: String,
    // },
    // imgContentType: {
    //   type: String,
    // },
    // imgData: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
