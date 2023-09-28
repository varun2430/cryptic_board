import axios from "axios";

export const getReplyStats = async () => {
  const res = await axios.get("http://localhost:5000/api/reply/stats");
  return res.data;
};

export const getReplys = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/reply/${id}`);
  return res.data;
};

export const uploadReply = async (id, reply) => {
  const data = {
    postId: id,
    reply: reply,
  };
  const res = await axios.post("http://localhost:5000/api/reply", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
