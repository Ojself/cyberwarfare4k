import React, {useEffect,useState} from 'react'
import api from "../../../api";
import TextInput from "./TextInput";


import { dateConverter } from "../_helpers";
import Comment from "./Comment"
import "./betaForum.scss";


const BetaForum = ({ user, updateGlobalValues }) => {
  const [betaForum, setBetaForum] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(true);
  const [forumType, setForumType] = useState("")

  useEffect(() => {
    const getBetaForum = async (forumType) => {
      
      let data;
      try {
        data = await api.getBetaForum(forumType);
      } catch (err) {
        console.error("error", err);
      }
      console.log(data.comments,'datacomments')
      setBetaForum(data.comments);
      setLoading(false);
    };
    let forumType = window.location.pathname.match(/[a-f\d]{24}/);
    if (forumType && forumType.length) {
      forumType = forumType[0];
    } else {
      forumType = "global";
    }
    getBetaForum(forumType);
    setForumType(forumType)
  }, []);

  const handleCommentPost = async () => {
    let data 
    try {
    data = await api.postBetaComment(textArea, forumType);
    } catch (err){
      updateGlobalValues(err)
      return
    }
    setTextArea("");
    
    const oldbetaForum = betaForum.slice()
    oldbetaForum.unshift(data.comment)
    setBetaForum(oldbetaForum)
  };

const handleCommentLike = async (id) => {
  let data;
  try {
    data = await api.likeBetaComment(id);
  } catch (err) {
    
    updateGlobalValues(err);
    return;
  }

  const oldbetaForum = betaForum.slice();
  const commentIndex = oldbetaForum.findIndex((comment) => { 
    return comment._id === data.comment._id;
  });
  if (commentIndex !== -1) {
    
    oldbetaForum[commentIndex] = data.comment;
  }
  setBetaForum(oldbetaForum);
};


  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
  };

  return (
    <div className="page-container">
      <h1>{forumType !== "global" && "Alliance"} Forum</h1>
      <h6 className="text-warning">BETA</h6>
      <div className="content">
        {user && (
          <TextInput
            handleCommentPost={handleCommentPost}
            textArea={textArea}
            handleTextAreaChange={handleTextAreaChange}
            user={user}
          />
        )}
        {loading ? (
          <p>Loading..</p>
        ) : betaForum.length ? (
          betaForum.map((c, i) => (
            <Comment
              key={c._id}
              forumType={forumType}
              comment={c.comment}
              createdAt={dateConverter(c.createdAt)}
              updatedAt={dateConverter(c.updatedAt)}
              creator={c.creator}
              edited={c.edited}
              likes={JSON.stringify(c.likes)}
              id={c._id}
              i={i}
              hash={betaForum.length - i}
              handleCommentLike={handleCommentLike}
            />
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
  );
};

export default BetaForum




