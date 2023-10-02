import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getReplyStats = async () => {
  const res = await axios.get(`${API_URL}/api/reply/stats`, {
    headers: {
      "api-key": API_KEY,
    },
  });
  return res.data;
};

export const getReplys = async (id) => {
  const res = await axios.get(`${API_URL}/api/reply/${id}`, {
    headers: {
      "api-key": API_KEY,
    },
  });
  return res.data;
};

export const uploadReply = async (id, reply) => {
  const data = {
    postId: id,
    reply: reply,
  };
  const res = await axios.post(`${API_URL}/api/reply `, data, {
    headers: {
      "api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
