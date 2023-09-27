import { useState, useEffect } from "react";
import { getPosts } from "../services/postService";
import HomeTopic from "../components/HomeTopic";
import HomePost from "../components/HomePost";

const topics = [
  "Anime & Manga",
  "Video Games",
  "TV Shows & Movies",
  "Books & Literature",
  "Music & Bands",
  "Travel & Adventure",
  "Food & Cooking",
  "Fitness & Health",
  "Technology & Gadgets",
  "Science & Space",
  "History",
  "Pets & Animals",
  "Self-Improvement",
  "Cryptocurrency & Finance",
  "Memes",
  "Conspiracy Theories",
  "Sports & Athletics",
  "Gardening",
  "Hobbies & Collectibles",
  "Educational Resources",
  "Photography",
  "Programming",
  "Automobile",
  "True Crime",
  "Fandoms",
  "Science Fiction",
  "Paranormal & Supernatural",
  "Crafting & DIY",
];

const Home = () => {
  const [homePosts, sethomePosts] = useState([]);

  const getHomePosts = async () => {
    try {
      const resData = await getPosts();
      sethomePosts(resData);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  };

  useEffect(() => {
    getHomePosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className=" flex flex-col items-center justify-center lg:mx-24 mx-2">
        <div className=" flex items-center justify-center h-32 md:w-5/6 w-full bg-gray-600 mt-2 mb-1">
          <p className=" text-5xl md:text-6xl font-bold text-white">
            Cryptic Board
          </p>
        </div>
        <div className=" md:w-5/6 w-full bg-gray-600 my-1">
          <div className=" flex flex-col justify-center w-full">
            <div className="flex items-center justify-start bg-red-500">
              <p className=" text-xl font-bold px-2 py-1">Topics</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 px-2 pt-1 pb-1">
              {topics.map((topic, index) => (
                <HomeTopic key={index} topic={topic} />
              ))}
            </div>
          </div>
        </div>
        <div className=" md:w-5/6 w-full bg-gray-600 my-1">
          <div className=" flex flex-col justify-center w-full">
            <div className="flex items-center justify-start bg-red-500">
              <p className=" text-xl font-bold px-2 py-1">Popular Posts</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-4 p-2">
              {homePosts.map(({ _id, topic, subject }) => (
                <HomePost key={_id} id={_id} topic={topic} subject={subject} />
              ))}
            </div>
          </div>
        </div>
        <div className=" md:w-5/6 w-full bg-gray-600 mt-1 mb-2">
          <div className=" flex flex-col justify-center w-full">
            <div className="flex items-center justify-start bg-red-500">
              <p className=" text-xl font-bold px-2 py-1">Stats</p>
            </div>
            <div className="flex flex-row justify-around">
              <div className=" flex items-center justify-center text-center p-1">
                <p className=" text-md text-white">Posts: 111</p>
              </div>
              <div className=" flex items-center justify-center text-center p-1">
                <p className=" text-md text-white">Replies: 212</p>
              </div>
              <div className=" flex items-center justify-center text-center p-1">
                <p className=" text-md text-white">Content: 64 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
