import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import dateConverter from "../_helpers";
import { PopoverBody, UncontrolledPopover, Button } from "reactstrap";

const ForumThread = (props) => {
  const [threadState, setThreadState] = useState({
    loading: true,
    threadTitle: "Thread",
    threadCreatorName: "AdminTor",
    threadCreatorId: "5e2b267941eacc1d425b35d7",
    threadCreatedAt: "01 Jan 1970",

    comments: [],
  });

  const CommentComponent = (props) => {
    const likes = JSON.parse(props.likes);

    return (
      <div className="commentWrapper">
        <div className="commentInfoLeft">
          <img
            className="commentAvatar"
            src={props.creator.account.avatar}
            alt="Hacker Avatar"
          />
          <Link to={`/hacker/${props.creator._id}`}>
            {/* TODO something wrong with link */}
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

          <div className="commentInfoBottom">
            <div className="likeInformation">
              <img
                src="../../forumIcons/white/baseline_thumb_up_white_48dp.png"
                alt="Like icon"
                title={`${likes.length} likes`}
              />

              <span id={`PopoverFocus${props.i}`} type="button">
                {likes.length}
              </span>
              {/* <Button style={{ height: "10px" }} outline color="primary">
                primary
              </Button> */}

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
            </div>
            <div className="lastUpdate">
              {props.edited && <p>Last updated: {props.updatedAt}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const threadId = window.location.pathname.match(/[a-f\d]{24}$/);
  console.log(threadId, "threadId");
  useEffect(() => {
    async function fetchData(threadId) {
      const apiResponse = await api.getComments(threadId);
      const apiComments = apiResponse.comments;

      const threadCreatedAt = dateConverter(apiComments[0].createdAt);

      console.log(apiResponse, "response");
      setThreadState({
        ...threadState,
        comments: apiComments,
        threadTitle: apiComments[0].forumThread.title,
        threadCreatorName: apiComments[0].creator.name,
        threadCreatorId: apiComments[0].creator._id,
        threadCreatedAt,
        loading: false,
      });
    }
    fetchData(threadId[0]);
  }, []);
  return (
    <div className="page-container">
      <div className="content">
        <div className="singleThreadTitleWrapper">
          <div className="singleThreadTitle">
            <h1>{threadState.threadTitle}</h1>
          </div>
          <div className="singleThreadNameDateWrapper">
            <Link to={`/hacker/${threadState.threadCreatorId}`}>
              {threadState.threadCreatorName}
            </Link>
            <p>{threadState.threadCreatedAt.slice(0, 11)}</p>
          </div>
        </div>

        <div className="commentsWrapper">
          {threadState.loading ? (
            <p>loading..</p>
          ) : (
            threadState.comments.map((c, i) => {
              return (
                <CommentComponent
                  key={i}
                  comment={c.comment}
                  createdAt={dateConverter(c.createdAt)}
                  updatedAt={dateConverter(c.updatedAt)}
                  creator={c.creator}
                  edited={c.edited}
                  likes={JSON.stringify(c.likes)}
                  id={c._id}
                  threadId={c.forumThread._id}
                  i={i}
                  hash={i === 0 ? 1 : threadState.comments.length + 1 - i}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumThread;
