import axios from "axios";

export const getObjectUrl = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/file/${id}`);
  return res.data.url;
};
