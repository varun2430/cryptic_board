import { useState, useEffect } from "react";
import { getPostStats, getPosts } from "../services/postService";
import HomeTopic from "../components/HomeTopic";
import HomePost from "../components/HomePost";
import { getFileStats } from "../services/fileService";
import { getReplyStats } from "../services/replyService";

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
  const [homePosts, sethomePosts] = useState(null);
  const [postsCount, setPostsCount] = useState(0);
  const [replysCount, setReplyssCount] = useState(0);
  const [contentSize, setContentSize] = useState("0 B");

  const getHomePosts = async () => {
    try {
      const resData = await getPosts();
      sethomePosts(
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
      console.error("Error fetching popular posts:", error);
    }
  };

  const getStats = async () => {
    try {
      const resPostData = await getPostStats();
      setPostsCount(resPostData.count);
      const resReplyData = await getReplyStats();
      setReplyssCount(resReplyData.count);
      const resFileData = await getFileStats();
      setContentSize(resFileData.totalSize);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getStats();
    getHomePosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className=" flex flex-col items-center justify-center lg:mx-24 mx-2">
        <div className=" flex items-center justify-center h-32 md:w-5/6 w-full bg-neutral-900 mt-2 mb-1">
          <p className=" text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-500 text-transparent bg-clip-text animate-gradient">
            Cryptic Board
          </p>
        </div>
        <div className=" md:w-5/6 w-full bg-neutral-900 my-1">
          <div className=" flex flex-col justify-center w-full">
            <div className="flex items-center justify-start bg-gradient-to-r from-[#2C3E50] to-[#000000]">
              <p className=" text-xl font-bold px-2 py-1">Topics</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 px-2 pt-1 pb-1">
              {topics.map((topic, index) => (
                <HomeTopic key={index} topic={topic} />
              ))}
            </div>
          </div>
        </div>
        <div className=" md:w-5/6 w-full bg-neutral-900 my-1">
          <div className=" flex flex-col justify-center w-full">
            <div className="flex items-center justify-start bg-gradient-to-r from-[#2C3E50] to-[#000000]">
              <p className=" text-xl font-bold px-2 py-1">Popular Posts</p>
            </div>
            {homePosts === null ? (
              <>
                <div className="flex justify-center items-center h-[20rem] lg:h-[28rem] md:h-[24rem] w-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
                </div>
              </>
            ) : (
              <>
                {homePosts.length === 0 ? (
                  <div className="flex justify-center items-center h-[20rem] lg:h-[28rem] md:h-[24rem] w-full">
                    <p className=" text-4xl">🕸️</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-4 p-2">
                    {homePosts.map(({ _id, topic, subject }) => (
                      <HomePost
                        key={_id}
                        id={_id}
                        topic={topic}
                        subject={subject}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className=" md:w-5/6 w-full bg-neutral-900 mt-1 mb-2">
          <div className=" flex flex-col justify-center w-full">
            <div className="flex items-center justify-start bg-gradient-to-r from-[#2C3E50] to-[#000000]">
              <p className=" text-xl font-bold px-2 py-1">Stats</p>
            </div>
            <div className="flex flex-row justify-around">
              <div className=" flex items-center justify-center text-center p-1">
                <p className=" text-md text-white">Posts: {postsCount}</p>
              </div>
              <div className=" flex items-center justify-center text-center p-1">
                <p className=" text-md text-white">Replies: {replysCount}</p>
              </div>
              <div className=" flex items-center justify-center text-center p-1">
                <p className=" text-md text-white">Content: {contentSize}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
