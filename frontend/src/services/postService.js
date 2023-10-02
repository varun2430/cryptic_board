import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getPostStats = async () => {
  const res = await axios.get(`${API_URL}/api/post/stats`, {
    headers: {
      "api-key": API_KEY,
    },
  });
  return res.data;
};

export const getPosts = async (topic = "") => {
  const url = topic
    ? `${API_URL}/api/post/${topic.replace(/ /g, "_")}/`
    : `${API_URL}/api/post/`;
  const res = await axios.get(url, {
    headers: {
      "api-key": API_KEY,
    },
  });
  return res.data;
};

export const uploadPost = async (topic, subject, description, file) => {
  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("subject", subject);
  formData.append("description", description);
  formData.append("file", file);

  const res = await axios.post(`${API_URL}/api/post/`, formData, {
    headers: {
      "api-key": API_KEY,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
