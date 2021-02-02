import React from "react";
import ForumComponent from "./ForumComponent";

const ForumOverviewCategoryComponent = (props) => {
  return (
    <div className="categoryComponent">
      <h1 style={{ textTransform: "capitalize" }}>{props.category}</h1>

      {props.forums.map((f, i) => {
        return (
          <ForumComponent
            key={i}
            id={f._id}
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

export default ForumOverviewCategoryComponent;
