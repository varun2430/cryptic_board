import { Link } from "react-router-dom";

const HomeTopic = (props) => {
  return (
    <>
      <div className=" flex items-center justify-start mb-1 mx-1">
        <Link to={`/topic/${props.topic.replace(/ /g, "_")}`}>
          <p className=" text-md text-white hover:text-teal-300">
            {props.topic}
          </p>
        </Link>
      </div>
    </>
  );
};

export default HomeTopic;
