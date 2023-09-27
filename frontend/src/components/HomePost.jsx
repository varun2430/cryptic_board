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
      <div className=" flex flex-col items-center justify-start bg-slate-800 h-full w-full">
        <div className=" flex items-center justify-center text-center p-1">
          <p className=" text-md text-white">/{props.topic}</p>
        </div>
        {imgUrl && (
          <img
            src={`${imgUrl}`}
            alt="post img"
            className="h-48 w-full object-contain px-1"
          />
        )}

        <div className=" flex items-center justify-center text-center p-1">
          <p className=" text-md text-white">{props.subject}</p>
        </div>
      </div>
    </>
  );
};

export default HomePost;
