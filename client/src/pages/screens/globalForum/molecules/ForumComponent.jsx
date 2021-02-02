import React from "react";
import { Link } from "react-router-dom";

const ForumComponent = (props) => {
  return (
    <div className="forumComponentWrapper">
      <div className="logoWrapper">
        <img src={`forumIcons/white/${props.title}.png`} alt="Forum logo" />
      </div>
      <div className="infoWrapper">
        <Link to={`/forum/${props.id}`}>
          <h4 className="forumTitle">{props.title}</h4>
        </Link>
        <p className="threadCount">
          <i>{props.threadCount} threads</i>
        </p>
        <p>{props.description}</p>
      </div>
      <div className="createdWrapper">
        <p>
          Created by
          <Link
            style={{ display: "inline-block", padding: "1vmin" }}
            to={`/hacker/${props.creator._id}`}
          >
            {" " + props.creator.name}
          </Link>
        </p>
        <p>Created at {props.createdAt.toString().slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default ForumComponent;
