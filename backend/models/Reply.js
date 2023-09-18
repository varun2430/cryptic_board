import { Schema, model } from "mongoose";

const replySchema = Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reply = model("Reply", replySchema);
export default Reply;
