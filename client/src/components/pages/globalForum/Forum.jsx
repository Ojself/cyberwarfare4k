import React, { useState, useEffect } from "react";
import api from "../../../api";
import CategoryComponent from "./molecules/CategoryComponent";
import "./forumStyle.scss";

const Forum = (props) => {
  const [forumState, setforumState] = useState({
    loading: true,
    forums: [],
  });

  useEffect(async () => {
    const apiResponse = await api.getForums();

    const forums = forumDataMassager(
      apiResponse.forums,
      apiResponse.threadCount
    );
    setforumState({
      ...forumState,
      forums: forums,
      loading: false,
    });
  }, []);

  // sorts forums into categories and attach x threads
  const forumDataMassager = (apiForums, threadCount) => {
    const forums = {};
    apiForums.forEach((f) => {
      if (!forums[f.category]) {
        forums[f.category] = [];
      }
      f.threadCount = threadCount[f._id];

      forums[f.category].push(f);
    });

    return forums;
  };

  const forumPage = Object.keys(forumState.forums).map((forum, i) => {
    // ['administration','general','offtopic']
    return (
      <div key={i}>
        <CategoryComponent category={forum} forums={forumState.forums[forum]} />
      </div>
    );
  });

  console.log(forumState, "forumState");
  return (
    <div className="page-container">
      <h1>Forum</h1>
      {forumState.loading ? <p>loading..</p> : forumPage}
    </div>
  );
};

export default Forum;
