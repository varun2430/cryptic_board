import axios from "axios";
import Post from "../components/Post";
import { useEffect, useState } from "react";

const Topic = () => {
  const [posts, setPosts] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" flex flex-col items-center justify-center lg:mx-24 mx-2">
      <div className=" flex items-center justify-center h-32 md:w-5/6 w-full bg-gray-600 mt-2 mb-1">
        <p className=" text-5xl md:text-6xl font-bold text-white">/topic</p>
      </div>
      <div className=" md:w-5/6 w-full bg-gray-600 my-1">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-red-500">
            <p className=" text-xl font-bold px-2 py-1">New Post</p>
          </div>
          <div className=" w-full">
            <form className=" px-4 pt-2 pb-2">
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="border rounded w-full py-1 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-1 px-3 bg-grey-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                  placeholder="Enter description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="file"
                >
                  File (Image or GIF)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" md:w-5/6 w-full bg-gray-600 my-1">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-red-500">
            <p className=" text-xl font-bold px-2 py-1">Posts</p>
          </div>
          <div className="flex flex-col">
            {posts === null ? (
              <></>
            ) : (
              posts.map(
                ({ _id, subject, description, imgContentType, imgData }) => (
                  <Post
                    key={_id}
                    id={_id}
                    subject={subject}
                    description={description}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
