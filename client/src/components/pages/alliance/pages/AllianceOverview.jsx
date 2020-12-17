import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { Link } from "react-router-dom";
import {  Card, CardBody, CardImg, CardSubtitle,  CardTitle} from "reactstrap"

const AllianceOverview = (props) => {
  const [alliance, setAlliance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(props,'props')
    
    const getAlliance = async () => {
      const allianceId = props.allianceId
        ? props.allianceId
        : props.match.params.id;
      let data;
      try {
        data = await api.getAlliance(allianceId);
        setAlliance(data.alliance);
        setLoading(false);
      } catch (err) {
        console.warn("error", err);
      }
    };
      getAlliance();
  }, []);

  const noAllianceFound = !loading && (
    <div>
      Noone has claimed the {alliance.name} alliance. You can try and{" "}
      <Link to={"/alliance/create"}> create </Link> it yourself
    </div>
  );

  const hierarchyTree = !loading && (
    <div className="content">
      <div className="d-flex justify-content-center">
        {alliance.boss && (
          <Card style={{paddingTop:"2vh", width: "20%", backgroundColor: "#111" }}>
            <CardTitle tag="h5">Boss</CardTitle>
            <CardImg
              
              style={{
                margin: "auto",
                width: "30%",
              }}
              src={`..${alliance.boss.account.avatar}`}
              alt={alliance.boss.name}
            />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Link to={`/hacker/${alliance.boss._id}`}>
                  {alliance.boss.name}
                </Link>
              </CardSubtitle>
            </CardBody>
          </Card>
        )}
      </div>
      <div className="d-flex justify-content-around my-5">
        <div></div>

        {alliance.analyst && (
          <Card style={{paddingTop:"2vh", width: "20%", backgroundColor: "#111" }}>
            <CardTitle tag="h5">analyst</CardTitle>
            <CardImg
              middle
              style={{
                margin: "auto",
                width: "30%",
              }}
              src={`..${alliance.analyst.account.avatar}`}
              alt={alliance.analyst.name}
            />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Link to={`/hacker/${alliance.analyst._id}`}>
                  {alliance.analyst.name}
                </Link>
              </CardSubtitle>
            </CardBody>
          </Card>
        )}

        {alliance.cto && (
          <Card style={{paddingTop:"2vh", width: "20%", backgroundColor: "#111" }}>
            <CardTitle tag="h5">CTO</CardTitle>
            <CardImg
              middle
              style={{
                margin: "auto",
                width: "30%",
              }}
              src={`..${alliance.cto.account.avatar}`}
              alt={alliance.cto.name}
            />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Link to={`/hacker/${alliance.cto._id}`}>
                  {alliance.cto.name}
                </Link>
              </CardSubtitle>
            </CardBody>
          </Card>
        )}
        <div></div>
      </div>
      <div className="d-flex justify-content-around mb-5 ">
        <div>
          {alliance.firstLead && (
            <Card style={{paddingTop:"2vh", width: "100%", backgroundColor: "#111" }}>
              <CardTitle tag="h5">Lead</CardTitle>
              <CardBody>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  <Link to={`/hacker/${alliance.firstLead._id}`}>
                    {alliance.firstLead.name}
                  </Link>
                </CardSubtitle>
              </CardBody>
            </Card>
          )}
        </div>
        <div>
          {alliance.secondLead && (
            <Card style={{paddingTop:"2vh", width: "100%", backgroundColor: "#111" }}>
              <CardTitle tag="h5">Lead</CardTitle>
              <CardBody>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  <Link to={`/hacker/${alliance.secondLead._id}`}>
                    {alliance.secondLead.name}
                  </Link>
                </CardSubtitle>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-around">
        {!!alliance.firstMonkeys.length  && (
        <div>
          <h4>Code monkeys</h4>
          {alliance.firstMonkeys.length ? (
            alliance.firstMonkeys.map((monkey) => (
              <div key={monkey.name}>
                {" "}
                <Link to={`/hacker/${monkey._id}`}> {monkey.name} </Link>
              </div>
            ))
          ) : (
            <h6>-</h6>
          )}
        </div>)}
        {!!alliance.secondMonkeys.length  && (
        <div>
          <h4>Code monkeys</h4>
          {alliance.secondMonkeys.length ? (
            alliance.secondMonkeys.map((monkey) => (
              <div key={monkey.name}>
                {" "}
                <Link to={`/hacker/${monkey._id}`}> {monkey.name} </Link>
              </div>
            ))
          ) : (
            <h6>-</h6>
          )}
        </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <h1 className="">{loading ? "Alliance" : alliance.name}</h1>
      {alliance ? hierarchyTree : noAllianceFound}
    </div>
  );
};

export default AllianceOverview;
