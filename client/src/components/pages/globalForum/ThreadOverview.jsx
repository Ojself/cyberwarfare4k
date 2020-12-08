import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../api";

const SingleForum = (props) => {
  const [singleForumState, setsingleForumState] = useState({
    loading: true,
    forumName: "Forum",
    threads: [],
  });

  const forumId = window.location.pathname.match(/[a-f\d]{24}$/);
  useEffect(() => {
    const fetchSingleForumData = async (forumId) => {
      const apiResponse = await api.getThreads(forumId);
      console.log(apiResponse, "response");
      const forumName = apiResponse.threads[0].forum.title
        ? apiResponse.threads[0].forum.title
        : "Forum";
      const threads = apiResponse.threads;

      threads.forEach((t) => {
        t.commentCount = apiResponse.commentCount[t._id];
      });

      setsingleForumState({
        ...singleForumState,
        forumName,
        threads,
        loading: false,
      });
    };

    fetchSingleForumData(forumId[0]);
  }, []);

  const ThreadComponent = (props) => {
    return (
      <div>
        <div>
          <Link to={`/forum/${props.forumId}/${props.id}`}>
            <h5>{`${props.sticky ? "STICKY: " : ""}${props.title}`}</h5>
          </Link>
          <p>
            <i>{props.commentCount} comments</i>
          </p>
        </div>
        <div>
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

  return (
    <div className="page-container">
      <h1>{singleForumState.forumName}</h1>
      <div className="content">
        {singleForumState.loading ? (
          <p>loading...</p>
        ) : (
          singleForumState.threads.map((t, i) => {
            return (
              <ThreadComponent
                key={i}
                id={t._id}
                forumId={t.forum._id}
                commentCount={t.commentCount}
                createdAt={t.createdAt}
                creator={t.creator}
                title={t.title}
                sticky={t.sticky}
                locked={t.locked}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SingleForum;
