import Reply from "./Reply";

const Post = (props) => {
  return (
    <div className=" flex flex-col items-center justify-center rounded bg-slate-800 h-full m-2">
      <div className=" flex flex-row justify-between px-2 pt-1 w-full">
        <p className=" text-sm font-bold text-gray-500">username2434</p>
        <p className=" text-sm font-bold text-gray-500">
          11/01/15(Sun)17:06:48
        </p>
      </div>
      <div className=" flex items-center justify-start px-2 pb-1 w-full">
        <p className=" text-lg font-bold text-white">{props.subject}</p>
      </div>
      <img
        src={props.image}
        alt="post img"
        className=" h-48 md:h-64 w-full object-contain px-1 "
      />
      <div className=" flex items-center justify-center text-justify p-1">
        <p className=" text-md text-white">{props.description}</p>
      </div>
      <div className=" flex items-center justify-start w-full p-1 hover:bg-gray-500">
        <i className="fa-solid fa-reply text-white"></i>
        <p className=" text-md text-white ml-1">10 Replies</p>
      </div>
      <div className=" flex flex-col items-center justify-center bg-gray-900 w-full px-2 pt-2">
        <div className=" w-full">
          <form className=" px-4 pt-2 pb-2">
            <div className="mb-1">
              <label
                className="block text-white text-sm font-bold mb-1"
                htmlFor="description"
              >
                Comment as username2434
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-1 px-3 bg-grey-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter description"
              />
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                Comment
              </button>
            </div>
          </form>
        </div>
        <Reply reply={props.subject} />
        <Reply reply={props.subject} />
        <Reply reply={props.subject} />
      </div>
    </div>
  );
};

export default Post;
