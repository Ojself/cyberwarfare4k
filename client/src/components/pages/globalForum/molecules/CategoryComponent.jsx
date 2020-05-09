import React from "react";
import ForumComponent from "./ForumComponent";

const CategoryComponent = (props) => {
  return (
    <div className="content text-left">
      <h2 style={{ textTransform: "capitalize" }}>{props.category}</h2>

      {props.forums.map((f) => {
        console.log(f, "fs");
        return (
          <ForumComponent
            description={f.description}
            threadCount={f.threadCount}
            createdAt={f.createdAt}
            creator={f.creator}
            title={f.title}
          />
        );
      })}
    </div>
  );
};

export default CategoryComponent;
