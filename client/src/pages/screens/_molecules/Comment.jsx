import React from "react";

import { Link } from "react-router-dom";

import {
  PopoverBody,
  UncontrolledPopover,
} from "reactstrap";




const Comment = (props) => {
  const likes = JSON.parse(props.likes);
  
const borderColor =
  props.forumType === "global"
    ? "2px solid dimgrey"
    : "2px solid darkslateblue";
  return (
    <div style={{ border: borderColor }} className="commentWrapper my-1">
      <div className="commentInfoLeft">
        <img
          className="commentAvatar"
          src={props.creator.account.avatar}
          alt="Hacker Avatar"
        />
        <Link to={`/hacker/${props.creator._id}`}>
          <p>{props.creator.name}</p>
        </Link>
      </div>
      <div className="commentSection">
        <div className="commentInfoTop">
          <span>
            {props.createdAt}
            {props.edited && (
              <img
                src="../../forumIcons/white/baseline_create_white_48dp.png"
                alt="Like icon"
                title="edited"
              />
            )}
          </span>

          <span>#{props.hash}</span>
        </div>

        <div className="comment">
          <p>{props.comment}</p>
        </div>

        <div className="bottomActions">
          <div className="likeInformation">
            <img
              onClick={() => props.handleCommentLike(props.id)}
              style={{ cursor: "pointer" }}
              src="../../forumIcons/white/baseline_thumb_up_white_48dp.png"
              alt="Like icon"
              title={`${likes.length} likes`}
            />

            <span className="ml-2" id={`PopoverFocus${props.i}`} type="button">
              {likes.length}
            </span>

            <UncontrolledPopover
              placement="right"
              target={`PopoverFocus${props.i}`}
            >
              <PopoverBody>
                {likes.map((d, j) => {
                  /* needs styling so it's an actual list */
                  return (
                    <ul key={d._id} className="pl-0 my-1">
                      <Link key={j} to={`/hacker/${d._id}`}>
                        {d.name}
                      </Link>
                    </ul>
                  );
                })}
              </PopoverBody>
            </UncontrolledPopover>
          </div>
          {props.commentOwnedByUser &&
          
          <div className="deleteButton">
            <img
              onClick={() => props.handleCommentDelete(props.id)}
              style={{ cursor: "pointer" }}
              src="../../forumIcons/white/icons8-trash-26.png"
              alt="Like icon"
              title={`${likes.length} likes`}
            />
          </div>
          }
          {/* <div className="lastUpdate">
            {props.edited && <p>Last updated: {props.updatedAt}</p>}
          </div> */}
        </div>
      </div>
    </div>
  );
};



export default Comment