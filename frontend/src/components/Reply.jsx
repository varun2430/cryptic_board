const Reply = (props) => {
  const dtObj = new Date(props.createdAt);

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-300 rounded w-full mb-2">
      <div className=" flex flex-row justify-between px-2 pt-1 w-full">
        <p className=" text-sm font-bold text-gray-600">anonymous</p>
        <p className=" text-sm font-bold text-gray-600">
          {dtObj.toLocaleString()}
        </p>
      </div>
      <div className=" flex items-center justify-start px-2 pb-1 w-full">
        <p className=" text-md text-red-600">{props.reply}</p>
      </div>
    </div>
  );
};

export default Reply;
