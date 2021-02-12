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
import DashboardSafe from "./_molecules/DashboardSafe";
import DashboardBoss from "./_molecules/DashboardBoss";
import DashboardOrganize from "./_molecules/DashboardOrganize";
import DashboardInvite from "./_molecules/DashboardInvite";
import AllianceOverview from "./AllianceOverview";

const dataMassager = (userArray) => {
  return userArray.map((u) => {
    let allianceRole;
    if (u.allianceRole) allianceRole = u.allianceRole;
    return {
      value: u._id,
      label: u.name,
      allianceRole,
    };
  });
};

const Dashboard = ({ updateGlobalValues, history }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [alliance, setAlliance] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [selectedInvite, setSelectedInvite] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState(false);
  const [taxAmount, setTaxAmount] = useState(false);
  const [homeCity, setHomeCity] = useState(false);

  const handleTaxChange = (e) => {
    let newValue = e.target.value;
    if (newValue > 100) newValue = 100;
    setTaxAmount(Math.round(newValue));
  };

  const saveNewTax = async () => {
    let data;

    const formattedTaxAmount = parseInt(taxAmount, 10);
    try {
      data = await api.saveCityTax({ taxAmount: formattedTaxAmount });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setTaxAmount(false);
    setHomeCity(data.city);
  };

  const handleWithdrawAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const withdrawFromSafe = async () => {
    let data;
    try {
      data = await api.withdrawFromSafe({ withdrawAmount });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setWithdrawAmount(false);
    setAlliance(data.alliance);
  };

  const sendInvite = async (user) => {
    const userId = user.value;
    let data;
    try {
      data = await api.sendAllianceInvitation(userId);
    } catch (err) {
      console.error("err", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
    const oldInvitedMembmers = invitedMembers.slice();
    oldInvitedMembmers.unshift(data.invitedUser);
    setInvitedMembers(oldInvitedMembmers);
  };

  const rejectInvitation = async (userId) => {
    let data;
    try {
      data = await api.cancelAllianceInvitation(userId);
    } catch (err) {
      console.error("err", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
    setInvitedMembers(data.alliance.invitedMembers);
  };

  const promote = async (userId, title) => {
    let data;
    try {
      data = await api.promoteAllianceMember(userId, title);
    } catch (err) {
      console.error("err", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
    const massagedAllianceMembers = dataMassager(data.allianceMembers);
    setMembers(massagedAllianceMembers);

    //setSelectedPromotion(massagedPromotedUser)
    return true;
  };

  const handleInviteChange = (selectedOption) => {
    setSelectedInvite(selectedOption);
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
      setInvitedMembers(data.alliance.invitedMembers);
      setAlliance(data.alliance);
      setUsers(massagedAllUsers);
      setMembers(members);
      setHomeCity(data.city);
      setLoading(false);
    };
    getAllianceDashBoard();
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const leaveAlliance = async () => {
    let data;
    try {
      data = await api.leaveAlliance();
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data, true, true);
    history.push("/my-profile");
  };

  const tabContent = (
    <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <Row>
          <Col sm="12">
            {!loading && (
              <DashboardOverview
                alliance={alliance}
                leaveAlliance={leaveAlliance}
                homeCity={homeCity}
              />
            )}
          </Col>
        </Row>
      </TabPane>

      <TabPane tabId="2">
        {!loading && (
          <AllianceOverview
            homeCity={homeCity}
            members={members}
            allianceId={alliance._id}
          />
        )}
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
        <DashboardSafe
          loading={loading}
          alliance={alliance}
          withdrawAmount={withdrawAmount}
          handleWithdrawAmountChange={handleWithdrawAmountChange}
          withdrawFromSafe={withdrawFromSafe}
          handleTaxChange={handleTaxChange}
          taxAmount={taxAmount}
          saveNewTax={saveNewTax}
          homeCity={homeCity}
        />
      </TabPane>

      <TabPane tabId="5">
        <Row>
          <Col sm="12">
            <DashboardInvite
              handleInviteChange={handleInviteChange}
              selectedInvite={selectedInvite}
              users={users}
              loading={loading}
              sendInvite={sendInvite}
              rejectInvitation={rejectInvitation}
              invitedMembers={invitedMembers}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="6">
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
      {[
        "Overview",
        "Hierarchy",
        "Organize",
        "Safe",
        "Invite",
        "Boss Options",
      ].map((tabHeader, i) => {
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
      })}
      <div className="ml-5 w-100 ">{tabContent}</div>
    </Nav>
  );
  return (
    <div className="page-container d-flex flex-column ">
      <h1>Dashboard</h1>
      <div className="content">{tabs}</div>
    </div>
  );
};

export default Dashboard;
