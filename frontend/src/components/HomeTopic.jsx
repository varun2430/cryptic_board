const HomeTopic = (props) => {
  return (
    <>
      <div className=" flex items-center justify-start">
        <p className=" text-md text-white">{props.topic}</p>
      </div>
    </>
  );
};

export default HomeTopic;
