const HomePost = (props) => {
  return (
    <>
      <div className=" flex flex-col items-center justify-start bg-slate-800 h-full w-full">
        <div className=" flex items-center justify-center text-center p-1">
          <p className=" text-md text-white">/{props.topic}</p>
        </div>
        <img
          src={props.image}
          alt="post img"
          className="h-48 w-full object-contain px-1"
        />
        <div className=" flex items-center justify-center text-center p-1">
          <p className=" text-md text-white">{props.subject}</p>
        </div>
      </div>
    </>
  );
};

export default HomePost;
