import { Schema, model } from "mongoose";

const postSchema = Schema(
  {
    topic: {
      type: String,
    },
    subject: {
      type: String,
    },
    description: {
      type: String,
    },
    replyCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
