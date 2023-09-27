import { Schema, model } from "mongoose";

const replySchema = Schema(
  {
    postId: {
      type: String,
    },
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reply = model("Reply", replySchema);
export default Reply;
