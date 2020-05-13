import React, { useState, useEffect } from "react";
import api from "../../../api";
import CategoryComponent from "./molecules/CategoryComponent";
import "./forumStyle.scss";

const ForumOverview = (props) => {
  const [forumOverviewState, setforumOverviewState] = useState({
    loading: true,
    forums: [],
  });

  useEffect(() => {
    async function fetchForumOverviewData() {
      const apiResponse = await api.getForums();
      const forums = forumDataMassager(
        apiResponse.forums,
        apiResponse.threadCount
      );
      setforumOverviewState({
        ...forumOverviewState,
        forums: forums,
        loading: false,
      });
    }
    fetchForumOverviewData();
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

  const forumOverviewPage = Object.keys(forumOverviewState.forums).map(
    (forum, i) => {
      // ['administration','general','offtopic']
      return (
        <div key={i}>
          <CategoryComponent
            category={forum}
            forums={forumOverviewState.forums[forum]}
          />
        </div>
      );
    }
  );

  console.log(forumOverviewState, "forumOverviewState");
  return (
    <div className="page-container ">
      <h1>Forum</h1>
      {forumOverviewState.loading ? <p>loading..</p> : forumOverviewPage}
    </div>
  );
};

export default ForumOverview;
