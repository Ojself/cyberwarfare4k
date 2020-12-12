import React, { useEffect, useState } from "react";
import api from "../../../../api";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

import DashboardOverview from "./_molecules/DashboardOverview";
import DashboardVault from "./_molecules/DashboardVault"
import DashboardBoss from "./_molecules/DashboardBoss";

const Dashboard = ({ updateGlobalValues }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [allianceDcs, setAllianceDcs] = useState([]);
  const [alliance, setAlliance] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const getAllianceDashBoard = async ()=> {
      let data; 
      try {
      data = await api.getAllianceDashBoard()
      } catch (err){
        console.log('error: ', err)
      }
      console.log(data,'data from alliance dashboard')
      setAlliance(data.alliance)
      setLoading(false)
      // massage
    }
    getAllianceDashBoard()
  },[])

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const leaveAlliance = async () => {
    const data = await api.leaveAlliance();
    //setModal(!modal);
    updateGlobalValues(data);
  };

  const tabContent = (
    <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <Row>
          <Col sm="12">
            <h4>Alliance Data Centers</h4>
            
            {/* <p>Here you can see which cities you have chip chop shops</p> */}
             { !loading && <DashboardOverview allianceId={alliance._id} leaveAlliance={leaveAlliance} />} 
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="2">
        <DashboardVault />
      </TabPane>
      <TabPane tabId="3">
        <Row>
          <Col sm="12">
            <h4> Here you can organize</h4>
            <p>Promote, demote, kick </p>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="4">
        <Row>
          <Col sm="12">
            <h4>Here you can send invites</h4>
            <h6>Pending Invites</h6>
            <p> Take back invitation</p>
            <p> .map something</p>
            <p> dropdown</p>
            <p>Send invitation</p>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="5">
        <Row>
          <Col sm="12">
            <DashboardBoss />
            <h4> Here's secret options</h4>
            <p> Set vault password ✅ ❌</p>
            <p> Give organize permission </p>
            <p> Dissolve family</p>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  );

  const tabs = (
    <Nav tabs>
      <div>
        {["Overview", "Vault", "Organize", "Invite", "Boss Options"].map(
          (tabHeader, i) => {
            return (
              <NavItem key={i}>
                <NavLink
                  className={classnames({ active: activeTab === i + 1 + "" })}
                  onClick={() => {
                    toggleTab(i + 1 + "");
                  }}
                >
                  {tabHeader}
                </NavLink>
              </NavItem>
            );
          }
        )}
      </div>
      <div>{tabContent}</div>
    </Nav>
  );
  return (
    <div className="page-container d-flex justify-content-center">
      <h1>Dashboard</h1>
      <div className="content">{tabs}</div>
    </div>
  );
};

export default Dashboard;