const Reply = (props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-300 w-full mb-2">
      <div className=" flex flex-row justify-between px-2 pt-1 w-full">
        <p className=" text-sm font-bold text-gray-500">username2434</p>
        <p className=" text-sm font-bold text-gray-500">
          11/01/15(Sun)17:06:48
        </p>
      </div>
      <div className=" flex items-center justify-start px-2 pb-1 w-full">
        <p className=" text-md text-red-500">{props.reply}</p>
      </div>
    </div>
  );
};

export default Reply;
