import React, { useState, useEffect } from "react";
import api from "../../../api";
import ForumOverviewCategoryComponent from "./molecules/ForumOverviewCategoryComponent";
import "./forumStyle.scss";

const ForumOverview = (props) => {
  const [forumOverviewState, setforumOverviewState] = useState({
    loading: true,
    forums: [],
  });

  useEffect(() => {
    const fetchForumOverviewData = async () => {
      const data = await api.getForums();
      const forums = forumDataMassager(data.forums, data.threadCount);
      setforumOverviewState({
        ...forumOverviewState,
        forums: forums,
        loading: false,
      });
    };
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
          <ForumOverviewCategoryComponent
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
      <h6>Work In progress..</h6>
      {forumOverviewState.loading ? <p>loading..</p> : forumOverviewPage}
    </div>
  );
};

export default ForumOverview;
