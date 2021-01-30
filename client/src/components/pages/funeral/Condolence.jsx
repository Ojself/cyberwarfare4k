import React from "react";
import { Link } from "react-router-dom";

const Condolence = ({ creator, flower, comment }) => {
  const border = (color, px = "1") => {
    return { border: `${color} ${px}px solid` };
  };
  return (
    <div style={border("red")} className="d-flex w-100">
      <div style={border("green")} className="d-flex col-2">
        <img src={`../flowerPics/${flower}.jpg`} alt={flower} />
      </div>
      <div style={border("orange", 2)} className="d-flex flex-column col-10">
        <div
          style={border("white")}
          className="d-flex h-75 w-100 align-items-center"
        >
          {comment}
        </div>
        <div
          style={border("pink")}
          className="d-flex h-25 w-100 align-items-center"
        >
          <Link to={`/hacker/${creator._id}`}>{creator.name}</Link>
        </div>
      </div>
    </div>
  );
};

export default Condolence;
