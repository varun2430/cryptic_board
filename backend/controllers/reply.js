import Post from "../models/Post.js";
import Reply from "../models/Reply.js";

export const getStats = async (req, res) => {
  try {
    const count = await Reply.countDocuments();
    res.status(200).json({ count: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET REPLYS */
export const getReplys = async (req, res) => {
  try {
    const { postId } = req.params;
    try {
      const response = await Reply.find({ postId: postId });
      res.status(200).json(response);
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPLOAD REPLY */
export const postReply = async (req, res) => {
  try {
    const { postId, reply } = req.body;
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { replyCount: 1 } }
      );
      const newReply = new Reply({
        postId,
        reply,
      });
      const mongoRes = await newReply.save();
      res.status(201).json(newReply);
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
