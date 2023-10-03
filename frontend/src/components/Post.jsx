import { useEffect, useState } from "react";
import { getObjectUrl } from "../services/fileService.js";
import { getReplys, uploadReply } from "../services/replyService.js";
import Reply from "./Reply";

const Post = (props) => {
  const dtObj = new Date(props.createdAt);
  const [imgUrl, setImgUrl] = useState(null);
  const [hideReplys, setHideReplys] = useState(true);
  const [replys, setReplys] = useState(null);
  const [reply, setReply] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!reply.trim()) {
      errors.reply = "Reply is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const resData = await uploadReply(props.id, reply);
        setReplys([resData, ...replys]);
        setErrors({});
        setReply("");
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const getImgUrl = async () => {
    try {
      const resData = await getObjectUrl(props.id);
      setImgUrl(resData);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const getPostReplys = async () => {
    try {
      const resData = await getReplys(props.id);
      setReplys(
        resData.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        })
      );
    } catch (error) {
      console.error("Error fetching replys:", error);
    }
  };

  useEffect(() => {
    getImgUrl();
    // getPostReplys();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" flex flex-col items-center justify-center rounded bg-neutral-800 h-full m-2">
      <div className=" flex flex-row justify-between px-2 pt-1 w-full">
        <p className=" text-sm font-bold text-gray-400">anonymous</p>
        <p className=" text-sm font-bold text-gray-400">
          {dtObj.toLocaleString()}
        </p>
      </div>
      <div className=" flex items-center justify-start px-2 pb-1 w-full">
        <p className=" text-lg font-bold text-white">{props.subject}</p>
      </div>
      {imgUrl === null ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      ) : (
        <img
          src={`${imgUrl}`}
          alt="post img"
          className=" h-48 md:h-64 lg:h-80 w-full object-contain px-1 "
        />
      )}
      <div className=" flex items-center justify-center text-justify w-full py-1 px-2">
        <p className=" text-md text-gray-300 w-full">{props.description}</p>
      </div>
      <div
        className=" flex items-center justify-start w-full p-1 hover:bg-neutral-700 rounded-b"
        onClick={(e) => {
          getPostReplys();
          setHideReplys(!hideReplys);
        }}
      >
        {hideReplys ? (
          <i className="fa-solid fa-caret-down text-white pl-1"></i>
        ) : (
          <i className="fa-solid fa-caret-up text-white pl-1"></i>
        )}
        <p className=" text-md text-white ml-1">
          &nbsp;{replys === null ? props.replyCount : replys.length} Replies
        </p>
      </div>
      {!hideReplys && (
        <div className=" flex flex-col items-center justify-center bg-neutral-800 w-full px-3 pb-1">
          <div className=" w-full">
            <form className=" pt-2 pb-2" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="reply"
                >
                  Reply on this post
                </label>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full">
                    <textarea
                      id="reply"
                      name="reply"
                      className="border rounded h-8 w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter reply"
                      value={reply}
                      onChange={(e) => {
                        setReply(e.target.value);
                      }}
                    />
                    <div className="flex items-center justify-center pl-1">
                      <button
                        className=" h-8 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        <i className="fa-solid fa-reply text-white"></i>
                      </button>
                    </div>
                  </div>
                  {errors.reply && (
                    <p className="px-1 pt-1 text-sm text-red-500">
                      {errors.reply}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          {replys === null ? (
            <>
              <div className="flex justify-center items-center h-[8rem] w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
              </div>
            </>
          ) : (
            <>
              {replys.length === 0 ? (
                <div className="flex justify-center items-center h-[10rem] w-full">
                  <p className=" text-4xl">🕸️</p>
                </div>
              ) : (
                replys.map(({ _id, reply, createdAt }) => (
                  <Reply
                    key={_id}
                    id={_id}
                    reply={reply}
                    createdAt={createdAt}
                  />
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
