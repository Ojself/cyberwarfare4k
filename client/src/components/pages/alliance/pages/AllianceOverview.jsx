import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { Link } from "react-router-dom";

const AllianceOverview = (props) => {
  const [alliance, setAlliance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlliance = async () => {
      const allianceId = props.match.params.id;
      let data;
      try {
        data = await api.getAlliance(allianceId);
        setAlliance(data.alliance);
        setLoading(false);
      } catch (err) {
        console.warn('error',err)
      }
    };
    getAlliance();
  }, []);

  const styling = {
    officers: {
      minHeight: "100px",
    },
  };

  const noAllianceFound = !loading && (
    <div>
      Noone has claimed the {alliance.name} alliance. You can try and{" "}
      <Link to={"/alliance/create"}> create </Link> it yourself
    </div>
  );

  const hierarchyTree = !loading && (
    <div className="content">
      <div style={styling.officers}>
        <h4>Boss</h4>
        <img src="https://picsum.photos/100/100" alt="Boss" />
        <h6>{alliance.boss && <Link to={`/hacker/${alliance.boss._id}`}>  {alliance.boss.name} </Link>}</h6>
      </div>
      <div
        style={styling.officers}
        className="d-flex justify-content-around mb-5"
      >
        <div>
          <h4>Analyst</h4>
          <img src="https://picsum.photos/100/100" alt="Analyst" />
          <h6>{alliance.analyst && <Link to={`/hacker/${alliance.analyst._id}`}>  {alliance.analyst.name} </Link>}</h6>
        </div>
        <div>
          <h4>CTO</h4>
          <img src="https://picsum.photos/100/100" alt="CTO" />
          <h6>{alliance.cto && <Link to={`/hacker/${alliance.cto._id}`}>  {alliance.cto.name} </Link>}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-around mb-5">
        <div>
          <h4>Lead</h4>
          <h6>{alliance.firstLead && <Link to={`/hacker/${alliance.firstLead._id}`}>  {alliance.firstLead.name} </Link>}</h6>
        </div>
        <div>
          <h4>Lead</h4>
          <h6>{alliance.secondLead && <Link to={`/hacker/${alliance.secondLead._id}`}>  {alliance.secondLead.name} </Link>}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div>
          <h4>Code monkeys</h4>
          {alliance.firstMonkeys.length ? (
            alliance.firstMonkeys.map((monkey) => (
              <div key={monkey.name}>
                <h6 > <Link to={`/hacker/${monkey._id}`}>  {monkey.name} </Link></h6>
              </div>
            ))
          ) : (
            <h6>-</h6>
          )}
        </div>
        <div>
          <h4>Code monkeys</h4>
          {alliance.secondMonkeys.length ? (
            alliance.secondMonkeys.map((monkey) => (
              <div key={monkey.name}>
                <h6 > <Link to={`/hacker/${monkey._id}`}>  {monkey.name} </Link></h6>
              </div>
            ))
          ) : (
            <h6>-</h6>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <h1 className="display-4">{loading ? "Alliance" : alliance.name}</h1>
      {alliance ? hierarchyTree : noAllianceFound}
    </div>
  );
};

export default AllianceOverview;
