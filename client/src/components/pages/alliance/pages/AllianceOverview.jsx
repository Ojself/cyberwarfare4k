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
      } catch (err) {}
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
        <h5>Boss</h5>
        <img src="https://picsum.photos/100/100" alt="Boss" />
        <h6>{alliance.boss && alliance.boss.name}</h6>
      </div>
      <div
        style={styling.officers}
        className="d-flex justify-content-around mb-5"
      >
        <div>
          <h5>Analyst</h5>
          <img src="https://picsum.photos/100/100" alt="Analyst" />
          <h6>{alliance.analyst && alliance.analyst.name}</h6>
        </div>
        <div>
          <h5>CTO</h5>
          <img src="https://picsum.photos/100/100" alt="CTO" />
          <h6>{alliance.cto && alliance.cto.name}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-around mb-5">
        <div>
          <h5>Lead</h5>
          <h6>{alliance.firstLead && alliance.firstLead.name}</h6>
        </div>
        <div>
          <h5>Lead</h5>
          <h6>{alliance.secondLead && alliance.firstLead.name}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div>
          <h5>Code monkeys</h5>
          {alliance.firstMonkeys.length ? (
            alliance.firstMonkeys.map((monkey) => (
              <>
                <h6>{monkey.name}</h6>
              </>
            ))
          ) : (
            <h6>-</h6>
          )}
        </div>
        <div>
          <h5>Code monkeys</h5>
          {alliance.secondMonkeys.length ? (
            alliance.secondMonkeys.map((monkey) => (
              <>
                <h6>{monkey.name}</h6>
              </>
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
      {!alliance ? hierarchyTree : noAllianceFound}
    </div>
  );
};

export default AllianceOverview;
