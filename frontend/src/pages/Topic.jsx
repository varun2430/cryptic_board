import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { compressFile } from "../services/fileService.js";
import { getPosts, uploadPost } from "../services/postService.js";
import Post from "../components/Post.jsx";

const Topic = () => {
  const { topic } = useParams();
  const [posts, setPosts] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const getTopicPosts = async () => {
    try {
      const resData = await getPosts(topic);
      setPosts(resData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resData = await uploadPost(topic, subject, description, file);
      setPosts([...posts, resData]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    getTopicPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" flex flex-col items-center justify-center lg:mx-24 mx-2">
      <div className=" flex items-center justify-center h-32 md:w-5/6 w-full bg-zinc-800 mt-2 mb-1">
        <p className=" text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
          {`/${topic.replace(/_/g, " ")}`}
        </p>
      </div>
      <div className=" md:w-5/6 w-full bg-zinc-800 my-1">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-green-500">
            <p className=" text-xl font-bold px-2 py-1">New Post</p>
          </div>
          <div className=" w-full">
            <form className=" px-4 pt-2 pb-2">
              <div className="mb-2">
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
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-1 px-3 bg-grey-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
                  placeholder="Enter description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="file"
                >
                  File (Image or GIF)
                </label>
                <div className="flex flex-row">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png, .gif"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    onChange={async (e) => {
                      const compressedFile = await compressFile(
                        e.target.files[0]
                      );
                      setFile(compressedFile);
                    }}
                  />
                  <div className="flex items-center justify-center pl-1">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-11 w-11 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleSubmit}
                    >
                      <i className="fa-solid fa-paper-plane text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" md:w-5/6 w-full bg-zinc-800 mt-1 mb-2">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-green-500">
            <p className=" text-xl font-bold px-2 py-1">Posts</p>
          </div>
          <div className="flex flex-col">
            {posts.length === 0 ? (
              <div className="flex justify-center items-center h-[20rem] lg:h-[28rem] md:h-[24rem] w-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
              </div>
            ) : (
              posts.map(({ _id, subject, description, createdAt }) => (
                <Post
                  key={_id}
                  id={_id}
                  subject={subject}
                  description={description}
                  createdAt={createdAt}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
