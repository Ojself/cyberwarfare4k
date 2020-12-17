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
import DashboardOrganize from "./_molecules/DashboardOrganize";
import DashboardInvite from "./_molecules/DashboardInvite"

const dataMassager = (userArray) => {
  return userArray.map((u) => {
    let allianceRole;
    if (u.allianceRole) allianceRole = u.allianceRole
    return {
      value: u._id,
      label: u.name,
      allianceRole,
    };
  });
};

const Dashboard = ({ updateGlobalValues }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [alliance, setAlliance] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([])
  const [selectedInvite, setSelectedInvite] = useState(null)
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [loading, setLoading] = useState(true)

  const sendInvite = async (user)=> {
    const userId= user.value
    let data;
    try { data = await api.sendAllianceInvitation(userId)
    } catch (err){
      console.error('err',err)
      return updateGlobalValues(err)
    }
    updateGlobalValues(data);
    const oldInvitedMembmers = invitedMembers.slice()
    oldInvitedMembmers.unshift(data.invitedUser);
    setInvitedMembers(oldInvitedMembmers);
  }

  const promote = async ( userId, title)=> {
    let data;
    try {data = await api.promoteAllianceMember(userId, title)
    }catch (err){
      console.error('err',err)
      return updateGlobalValues(err)
    }
    updateGlobalValues(data);
    const massagedAllianceMembers = dataMassager(data.allianceMembers);
    setMembers(massagedAllianceMembers);
    
    //setSelectedPromotion(massagedPromotedUser)
    return true
  }

  const handleInviteChange = (selectedOption) => {
    setSelectedInvite( selectedOption );
  };
  const handlePromotionChange = (selectedOption) => {
    setSelectedPromotion(selectedOption);
  };

  useEffect(() => {
    const getAllianceDashBoard = async () => {
      let data;
      try {
        data = await api.getAllianceDashBoard();
      } catch (err) {
        console.error("error: ", err);
      }
      const massagedAllUsers = dataMassager(data.users);
      const allianceMembers = data.users.filter(
        (user) => user.alliance === data.alliance._id
      );
      const members = dataMassager(allianceMembers);
      setInvitedMembers(data.alliance.invitedMembers)
      setAlliance(data.alliance);
      setUsers(massagedAllUsers);
      setMembers(members);
      setLoading(false);
      // massage
    };
    getAllianceDashBoard();
  }, []);

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
            {/* <p>Here you can see which cities you have fence</p> */}
            {!loading && (
              <DashboardOverview
                allianceId={alliance._id}
                leaveAlliance={leaveAlliance}
              />
            )}
          </Col>
        </Row>
      </TabPane>

      <TabPane tabId="2">
        <DashboardVault />
      </TabPane>
      <TabPane tabId="3">
        <Row>
          <Col sm="12">
            <DashboardOrganize
              handlePromotionChange={handlePromotionChange}
              selectedPromotion={selectedPromotion}
              members={members}
              loading={loading}
              promote={promote}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="4">
        <Row>
          <Col sm="12">
            <DashboardInvite
              handleInviteChange={handleInviteChange}
              selectedInvite={selectedInvite}
              users={users}
              loading={loading}
              sendInvite={sendInvite}
              invitedMembers={invitedMembers}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="5">
        <Row>
          <Col sm="12">
            <DashboardBoss />
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  );

  const tabs = (
    <Nav tabs className="d-flex justify-content-center">
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
      <div className="ml-5 w-100 ">{tabContent}</div>
    </Nav>
  );
  return (
    <div
       className="page-container d-flex flex-column "
    >
      <h1>Dashboard</h1>
      <div className="content">{tabs}</div>
    </div>
  );
};

export default Dashboard;