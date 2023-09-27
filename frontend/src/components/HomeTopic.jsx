import { Link } from "react-router-dom";

const HomeTopic = (props) => {
  return (
    <>
      <div className=" flex items-center justify-start pb-1 px-1">
        <Link to={`/topic/${props.topic.replace(/ /g, "_")}`}>
          <p className=" text-md text-white">{props.topic}</p>
        </Link>
      </div>
    </>
  );
};

export default HomeTopic;
