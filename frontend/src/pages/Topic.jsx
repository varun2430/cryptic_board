import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { compressFile } from "../services/fileService.js";
import { getPosts, uploadPost } from "../services/postService.js";
import Post from "../components/Post.jsx";

const Topic = () => {
  const initialFormState = {
    subject: "",
    description: "",
    file: null,
  };
  const fileInputRef = useRef(null);
  const { topic } = useParams();
  const [posts, setPosts] = useState(null);
  const [sortBy, setSortBy] = useState("replyCount");
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "file" ? await compressFile(e.target.files[0]) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.file) {
      errors.file = "File is required";
    } else if (formData.file.size > 1048576) {
      errors.file = "File size is too large (max 1MB)";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const resData = await uploadPost(
          topic,
          formData.subject,
          formData.description,
          formData.file
        );
        setPosts([resData, ...posts]);
        setFormData(initialFormState);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setErrors({});
      } catch (error) {
        console.error("Error uploading post:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const getTopicPosts = async () => {
    try {
      const resData = await getPosts(topic);
      setPosts(
        resData.sort((a, b) => {
          if (b.replyCount !== a.replyCount) {
            return b.replyCount - a.replyCount;
          } else {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          }
        })
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getTopicPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" flex flex-col items-center justify-center lg:mx-24 mx-2">
      <div className=" flex items-center justify-center h-32 md:w-5/6 w-full bg-neutral-900 mt-2 mb-1">
        <p className=" text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
          {`/${topic.replace(/_/g, " ")}`}
        </p>
      </div>
      <div className=" md:w-5/6 w-full bg-neutral-900 my-1">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-gradient-to-r from-[#2C3E50] to-[#000000]">
            <p className=" text-xl font-bold px-2 py-1">New Post</p>
          </div>
          <div className=" w-full">
            <form className=" px-4 pt-2 pb-2" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="border rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <p className="px-1 pt-1 text-sm text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="border rounded w-full py-1 px-3 bg-grey-200 leading-tight focus:outline-none focus:shadow-outline h-12"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="px-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="file"
                >
                  File (Image or GIF)
                </label>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      type="file"
                      id="file"
                      name="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      ref={fileInputRef}
                      onChange={handleChange}
                    />
                    <div className="flex items-center justify-center pl-1">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-11 w-11 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        <i className="fa-solid fa-paper-plane text-white"></i>
                      </button>
                    </div>
                  </div>
                  {errors.file && (
                    <p className="px-1 pt-1 text-sm text-red-500">
                      {errors.file}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" md:w-5/6 w-full bg-neutral-900 mt-1 mb-2">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex flex-row items-center justify-between px-2 bg-gradient-to-r from-[#2C3E50] to-[#000000]">
            <p className=" text-xl font-bold">Posts</p>
            <div className="flex flex-row items-center justify-center">
              <p className=" px-1 py-1">Sort By:</p>
              <div
                className={`flex flex-row px-2 items-center justify-center ${
                  sortBy === "replyCount" ? "text-red-500" : "text-white"
                } hover:cursor-pointer hover:bg-neutral-700 rounded`}
                onClick={(e) => {
                  setSortBy("replyCount");
                  setPosts(
                    [...posts].sort((a, b) => {
                      return b.replyCount - a.replyCount;
                    })
                  );
                }}
              >
                <i className="fa-solid fa-fire"></i>
                <p className="font-bold pl-2">Top</p>
              </div>
              <div
                className={`flex flex-row px-2 items-center justify-center ${
                  sortBy === "createdAt" ? "text-red-500" : "text-white"
                } hover:cursor-pointer hover:bg-neutral-700 rounded`}
                onClick={(e) => {
                  setSortBy("createdAt");
                  setPosts(
                    [...posts].sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);
                      return dateB - dateA;
                    })
                  );
                }}
              >
                <i className="fa-solid fa-calendar-days"></i>
                <p className="font-bold pl-2">New</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {posts === null ? (
              <>
                <div className="flex justify-center items-center h-[20rem] lg:h-[28rem] md:h-[24rem] w-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
                </div>
              </>
            ) : (
              <>
                {posts.length === 0 ? (
                  <div className="flex justify-center items-center h-[20rem] lg:h-[28rem] md:h-[24rem] w-full">
                    <p className=" text-4xl">🕸️</p>
                  </div>
                ) : (
                  posts.map(
                    ({ _id, subject, description, replyCount, createdAt }) => (
                      <Post
                        key={_id}
                        id={_id}
                        subject={subject}
                        description={description}
                        replyCount={replyCount}
                        createdAt={createdAt}
                      />
                    )
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
