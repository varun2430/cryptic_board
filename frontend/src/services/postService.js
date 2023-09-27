import axios from "axios";

export const getPosts = async (topic = "") => {
  const url = topic
    ? `http://localhost:5000/api/post/${topic.replace(/ /g, "_")}/`
    : "http://localhost:5000/api/post/";
  const res = await axios.get(url);
  return res.data;
};

export const uploadPost = async (topic, subject, description, file) => {
  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("subject", subject);
  formData.append("description", description);
  formData.append("file", file);

  const res = await axios.post("http://localhost:5000/api/post/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
