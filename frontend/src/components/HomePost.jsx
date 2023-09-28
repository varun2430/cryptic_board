import { useState, useEffect } from "react";
import { getObjectUrl } from "../services/fileService.js";

const HomePost = (props) => {
  const [imgUrl, setImgUrl] = useState(null);

  const getImgUrl = async () => {
    try {
      const resData = await getObjectUrl(props.id);
      setImgUrl(resData);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    getImgUrl();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className=" flex flex-col items-center justify-start bg-zinc-700 hover:bg-zinc-600 rounded h-full w-full">
        <div className=" flex items-center justify-center text-center px-1 pt-1">
          <p className=" text-md text-white">/{props.topic}</p>
        </div>
        {imgUrl === null ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-200"></div>
          </div>
        ) : (
          <img
            src={`${imgUrl}`}
            alt="post img"
            className="h-48 w-full object-contain px-1"
          />
        )}

        <div className=" flex items-center justify-center text-center px-1 pb-1">
          <p className=" text-md text-white">{props.subject}</p>
        </div>
      </div>
    </>
  );
};

export default HomePost;
