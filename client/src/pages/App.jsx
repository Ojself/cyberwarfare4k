import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Typist from "react-typist";
import api from "../api";

import AllianceLadder from "./screens/alliance/pages/Ladder";
import AllianceOverview from "./screens/alliance/pages/AllianceOverview";
import BetaForum from "./screens/_molecules/BetaForum";
import CreateAlliance from "./screens/alliance/pages/CreateAlliance";
import CreateHacker from "./screens/createHacker/CreateHacker";
import Crimes from "./screens/crimes/crimes/Crimes";
import CryptoCurrency from "./screens/cryptoCurrency/CryptoCurrency";
import Dashboard from "./screens/alliance/pages/Dashboard";
import DataCenters from "./screens/DataCenters";
import EarnBattery from "./screens/earnBattery/EarnBattery";
import Espionage from "./screens/espionage/Espionage";
import Fence from "./screens/fence/Fence";
import Footer from "./screens/header-footer/Footer";
import Funeral from "./screens/funeral/Funeral";
import FuneralDetailed from "./screens/funeral/FuneralDetailed";
import HackerProfile from "./screens/hackerProfile/HackerProfile";
import HallOfFame from "./screens/HallOfFame/HallOfFame";
import Home from "./screens/home/Home";
import Information from "./screens/information/Information";
import Ladder from "./screens/Ladder";
import Ledger from "./screens/Ledger";
import Locals from "./screens/Locals";
import Marketplace from "./screens/marketplace/Marketplace";
import MessageCenter from "./screens/communication/MessageCenter";
import MyProfile from "./screens/myProfile/MyProfile";
import NavbarComp from "./screens/header-footer/Navbar";
import Notifications from "./screens/communication/Notifications";
import OrgCrimes from "./screens/orgCrimes/OrgCrimes";
import Petty from "./screens/crimes/petty/Petty";
import ServiceAndSupport from "./screens/ServiceAndSupport";
import StatusBar from "./screens/header-footer/Statusbar";
import TermsOfSale from "./screens/earnBattery/TermsOfSale";
import TokensStore from "./screens/tokens/TokenStore";
import VPN from "./screens/VPN/VPN";
import WantedList from "./screens/WantedList";

const App = () => {
  const [user, setUser] = useState(null);
  const [globalMessage, setGlobalMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalTimeoutId, setGlobalTimeoutId] = useState(0)

  /* Notifications */
  const [unreadMessage, setUnreadMessage] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(false);
  const [unreadForumComment, setUnreadForumComment] = useState(false);
  const [unreadAllianceComment, setUnreadAllianceComment] = useState(false);
  const [organizedCrimeStatus, setOrganizedCrimeStatus] = useState(false)

  const userIsAtStarPage = () => {
    const path = window.location.pathname;
    return (
      path === "/" || path === "/create-hacker" || path === "/create-hacker/"
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let data;
      try {
        data = await api.getUser();
      } catch (err) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setGlobalMessage({
          message: err.message,
          success: err.success || false,
        });
        return;
      }
      if (!data.user.account.isSetup && !userIsAtStarPage()) {
        window.location.pathname = "/create-hacker";
      }
      setUser(data.user);
      setUnreadMessage(data.unreadMessageExist);
      setUnreadNotification(data.unreadNotificationExist);
      setUnreadForumComment(data.unreadForumCommentExist);
      setUnreadAllianceComment(data.unreadAllianceCommentExist);
      setOrganizedCrimeStatus(data.organizedCrimeStatus)
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const clearCurrentGlobalmessage = () => {
    clearTimeout(globalTimeoutId)
    setGlobalMessage({
      message: "",
      success: false,
    });
  }

  const updateGlobalValues = (
    data,
    renderMessage = true,
    scrollToTop = false
  ) => {
    if (data.user) {
      setUser(data.user);
    }
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (renderMessage && data.message) {
      clearCurrentGlobalmessage()
      
      setGlobalMessage({
        message: data.message,
        success: data.success || false,
      });
      const timeoutId = setTimeout(() => {
        setGlobalMessage({ message: "", success: true });
      }, 5000);
      setGlobalTimeoutId(timeoutId)
    }
  };
  return (
    <div className="App text-light">
      {!userIsAtStarPage() && (
        <>
          <NavbarComp
            updateGlobalValues={updateGlobalValues}
            user={user}
            globalLoading={loading}
            unreadMessage={unreadMessage}
            unreadNotification={unreadNotification}
            unreadAllianceComment={unreadAllianceComment}
            unreadForumComment={unreadForumComment}
            organizedCrimeStatus={organizedCrimeStatus}
          />
          <StatusBar
            updateGlobalValues={updateGlobalValues}
            globalLoading={loading}
            user={user}
          />
          <div className="globalMessage">
            {globalMessage.message && (
              <Typist
                avgTypingDelay={5}
                className={`terminalFont ${
                  globalMessage.success ? "terminalTextwin" : "terminalTextlost"
                }`}
                cursor={{ show: false }}
              >
                {globalMessage.message}
              </Typist>
            )}
          </div>
        </>
      )}

      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/hall-of-fame"
          render={() => (
            <HallOfFame updateGlobalValues={updateGlobalValues} user={user} />
          )}
        />
        <Route
          path="/alliance/create"
          render={(props) => (
            <CreateAlliance
              {...props}
              globalLoading={loading}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/alliance/ladder"
          render={() => (
            <AllianceLadder
              updateGlobalValues={updateGlobalValues}
              user={user}
            />
          )}
        />
        <Route
          path="/alliance/dashboard"
          render={(props) => (
            <Dashboard
              {...props}
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
            />
          )}
        />

        <Route
          path="/beta-forum"
          render={() => (
            <BetaForum user={user} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route
          path="/alliance/:id/beta-forum"
          render={() => (
            <BetaForum user={user} updateGlobalValues={updateGlobalValues} />
          )}
        />

        <Route
          path="/alliance/:id"
          render={() => <AllianceOverview enableHeader={true} />}
        />
        <Route
          path="/fence"
          render={() => (
            <Fence
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              user={user}
            />
          )}
        />
        <Route
          path="/create-hacker"
          render={() => <CreateHacker globalLoading={loading} user={user} />}
        />
        <Route
          path="/cryptocurrency"
          render={() => (
            <CryptoCurrency
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/datacenters"
          render={() => (
            <DataCenters
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />

        <Route
          path="/earn-battery"
          render={() => (
            <EarnBattery
              glo
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/espionage"
          render={() => (
            <Espionage
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              user={user}
              setUnreadNotification={setUnreadNotification}
            />
          )}
        />
        <Route
          path="/funeral/:id"
          render={(props) => (
            <FuneralDetailed
              {...props}
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              user={user}
            />
          )}
        />
        <Route
          path="/funeral"
          render={() => <Funeral updateGlobalValues={updateGlobalValues} />}
        />
        <Route
          path="/crimes"
          render={() => (
            <Crimes user={user} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route
          path="/hacker/:id"
          render={(props) => (
            <HackerProfile {...props} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route
          path="/locals"
          render={() => <Locals globalLoading={loading} user={user} />}
        />

        <Route
          path="/my-profile"
          render={() => (
            <MyProfile
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />

        <Route
          path="/org-crimes"
          render={() => (
            <OrgCrimes
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
              setUnreadNotification={setUnreadNotification}
            />
          )}
        />
        <Route
          path="/petty-hacker"
          render={() => (
            <Petty
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/information"
          render={() => (
            <Information user={user} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route path="/ladder" component={Ladder} />
        <Route
          path="/ledger"
          render={() => (
            <Ledger
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              user={user}
            />
          )}
        />
        <Route
          path="/marketplace"
          render={() => (
            <Marketplace user={user} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route
          path="/messages"
          render={() => (
            <MessageCenter
              user={user}
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
            />
          )}
        />

        <Route
          path="/notifications"
          render={() => (
            <Notifications
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              user={user}
            />
          )}
        />
        <Route
          path="/service"
          render={() => (
            <ServiceAndSupport
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/terms-of-sale"
          render={() => <TermsOfSale user={user} />}
        />

        <Route
          path="/tokens"
          render={() => (
            <TokensStore
              globalLoading={loading}
              updateGlobalValues={updateGlobalValues}
              user={user}
            />
          )}
        />
        <Route
          path="/vpn"
          render={() => (
            <VPN
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              user={user}
            />
          )}
        />
        <Route
          path="/wanted-list"
          render={() => (
            <WantedList user={user} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      <Footer updateGlobalValues={updateGlobalValues} user={user} />
    </div>
  );
};

export default App;
