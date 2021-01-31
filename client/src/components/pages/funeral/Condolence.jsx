import React from "react";
import { Link } from "react-router-dom";

const Condolence = ({ creator, flower, comment }) => {
  return (
    <div
      /* style={{ border: "1px solid white" }} */ className="d-flex w-100 bg-dark"
    >
      <div className="d-flex pl-0 col-2">
        <img src={`../flowerPics/${flower}.jpg`} alt={flower} />
      </div>
      <div className="d-flex flex-column col-10">
        <div className="d-flex h-75 w-100 align-items-center">{comment}</div>
        <div
          style={{ fontSize: "0.75rem" }}
          className="d-flex h-25 w-100 align-items-center"
        >
          <Link to={`/hacker/${creator._id}`}>{creator.name}</Link>
        </div>
      </div>
    </div>
  );
};

export default Condolence;
