import React from "react";

const ForumComponent = (props) => {
  console.log(props);
  return (
    <div className="forumComponentWrapper">
      <img src="/baseline_help_white_18dp.png" alt="Forum logo" />
      <div className="infoWrapper">
        <h5>{props.title}</h5>
        <p className="threadCount">
          <i>{props.threadCount} threads</i>
        </p>
        <p>{props.description}</p>
      </div>
      <div className="createdWrapper">
        <p>Created by {props.creator.name}</p>
        <p>Created at {props.createdAt.toString().slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default ForumComponent;
