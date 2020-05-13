import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";

import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";

const ForumThread = (props) => {
  const [threadState, setThreadState] = useState({
    loading: true,
    title: "Thread",
    comments: [],
  });

  const CommentComponent = (props) => {
    const likes = JSON.parse(props.likes);

    return (
      <div>
        <div>
          <img src={props.creator.account.avatar} alt="Hacker Avatar" />
          <Link to={`/hacker/${props.creator._id}`}>
            {/* TODO something wrogn with link */}
            <p>{props.creator.name}</p>
          </Link>
        </div>
        <p>{props.createdAt}</p> {props.edited && <span>edited</span>}
        <p>{props.comment}</p>
        {props.edited && (
          <p>{`Last edited at: ${props.updatedAt.slice(
            0,
            10
          )}:${props.updatedAt.slice(11, 16)}`}</p>
        )}
        <span id={`PopoverFocus${props.i}`} type="button">
          {likes.length}
        </span>
        <span>Like{likes.length !== 1 && "s"}</span>
        <UncontrolledPopover
          placement="right"
          target={`PopoverFocus${props.i}`}
        >
          <PopoverBody>
            {likes.map((d, j) => {
              /* needs styling so it's an actual list */
              return (
                <Link key={j} to={`/hacker/${d._id}`}>
                  {d.name}
                </Link>
              );
            })}
          </PopoverBody>
        </UncontrolledPopover>
        <p>{props.updatedAt}</p>
        {/* <p>{likes.length && likes}</p> */}
      </div>
    );
  };

  const threadId = window.location.pathname.match(/[a-f\d]{24}$/);
  console.log(threadId, "threadId");
  useEffect(() => {
    async function fetchData(threadId) {
      const apiResponse = await api.getComments(threadId);

      console.log(apiResponse, "response");
      setThreadState({
        ...threadState,
        comments: apiResponse.comments,
        title: apiResponse.comments[0].forumThread.title,
        loading: false,
      });
    }
    fetchData(threadId[0]);
  }, []);
  return (
    <div className="page-container">
      <h1>{threadState.title}</h1>

      <div className="content">
        {threadState.loading ? (
          <p>loading..</p>
        ) : (
          threadState.comments.map((c, i) => {
            return (
              <div key={i}>
                <CommentComponent
                  comment={c.comment}
                  createdAt={c.createdAt}
                  updatedAt={c.updatedAt}
                  creator={c.creator}
                  edited={c.edited}
                  likes={JSON.stringify(c.likes)}
                  id={c._id}
                  threadId={c.forumThread._id}
                  i={i}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ForumThread;
