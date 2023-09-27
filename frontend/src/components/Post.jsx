import { useEffect, useState } from "react";
import { getObjectUrl } from "../services/fileService.js";
import { getReplys, uploadReply } from "../services/replyService.js";
import Reply from "./Reply";

const Post = (props) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [hideReplys, setHideReplys] = useState(true);
  const [replys, setReplys] = useState([]);
  const [reply, setReply] = useState("");
  const dtObj = new Date(props.createdAt);

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
      setReplys(resData);
    } catch (error) {
      console.error("Error fetching replys:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resData = await uploadReply(props.id, reply);
      setReplys([...replys, resData]);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  useEffect(() => {
    getImgUrl();
    getPostReplys();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" flex flex-col items-center justify-center rounded bg-slate-800 h-full m-2">
      <div className=" flex flex-row justify-between px-2 pt-1 w-full">
        <p className=" text-sm font-bold text-gray-500">anonymous</p>
        <p className=" text-sm font-bold text-gray-500">
          {dtObj.toLocaleString()}
        </p>
      </div>
      <div className=" flex items-center justify-start px-2 pb-1 w-full">
        <p className=" text-lg font-bold text-white">{props.subject}</p>
      </div>
      {imgUrl && (
        <img
          src={`${imgUrl}`}
          alt="post img"
          className=" h-48 md:h-64 w-full object-contain px-1 "
        />
      )}
      <div className=" flex items-center justify-center text-justify w-full p-1">
        <p className=" text-md text-white w-full">{props.description}</p>
      </div>
      <div
        className=" flex items-center justify-start w-full p-1 hover:bg-gray-500"
        onClick={(e) => {
          setHideReplys(!hideReplys);
        }}
      >
        {hideReplys ? (
          <i className="fa-solid fa-caret-down text-white pl-1"></i>
        ) : (
          <i className="fa-solid fa-caret-up text-white"></i>
        )}
        <p className=" text-md text-white ml-1">{replys.length} Replies</p>
      </div>
      {!hideReplys && (
        <div className=" flex flex-col items-center justify-center bg-gray-900 w-full px-3 pb-1">
          <div className=" w-full">
            <form className=" pt-2 pb-2">
              <div className="mb-2">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="reply"
                >
                  Reply on this post
                </label>
                <div className="flex flex-row">
                  <textarea
                    id="reply"
                    name="reply"
                    className="border rounded h-8 w-full py-1 px-3 bg-grey-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter reply"
                    onChange={(e) => {
                      setReply(e.target.value);
                    }}
                  />
                  <div className="flex items-center justify-center pl-1">
                    <button
                      className=" h-8 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleSubmit}
                    >
                      <i className="fa-solid fa-reply text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {replys.length === 0 ? (
            <></>
          ) : (
            replys.map(({ _id, reply, createdAt }) => (
              <Reply key={_id} id={_id} reply={reply} createdAt={createdAt} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
