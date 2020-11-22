import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";
import Typist from "react-typist";

import AllianceLadder from "./pages/alliance/pages/Ladder";
import AllianceOverview from "./pages/alliance/pages/AllianceOverview";
import CreateHacker from "./pages/createHacker/CreateHacker";
import CreateAlliance from "./pages/alliance/pages/CreateAlliance";
import CryptoCurrency from "./pages/cryptoCurrency/CryptoCurrency";
import DataCenters from "./pages/DataCenters";
import Footer from "./pages/header-footer/Footer";
import ThreadOverview from "./pages/globalForum/ThreadOverview";
import ForumOverview from "./pages/globalForum/ForumOverview";
import ForumThread from "./pages/globalForum/ForumThread";
import EarnBattery from "./pages/EarnBattery";
import HackerProfile from "./pages/HackerProfile";
import HackCrimes from "./pages/crimes/crimes/HackCrimes";
import Home from "./pages/home/Home";
import Information from "./pages/Information";
import Ladder from "./pages/Ladder";
import Locals from "./pages/Locals";
import Ledger from "./pages/Ledger";
import Marketplace from "./pages/Marketplace";
import MyProfile from "./pages/myProfile/MyProfile";
import MessageCenter from "./pages/communication/MessageCenter";
import NavbarComp from "./pages/header-footer/Navbar";
import Notifications from "./pages/communication/Notifications";
import Petty from "./pages/crimes/petty/Petty";
import StatusBar from "./pages/header-footer/Statusbar";
import SystemRepair from "./pages/SystemRepair";
import VPN from "./pages/VPN";
import WantedList from "./pages/WantedList";

const App = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [globalMessage, setGlobalMessage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const apiUser = await api.getUser();

      setUser(apiUser.user);
      setMessages(apiUser.messages);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const updateGlobalValues = (data, renderMessage = true) => {
    console.log("updating global", data);
    if (data.user) {
      console.log("setting user");
      setUser(data.user);
    }
    if (renderMessage && data.message) {
      setGlobalMessage({
        message: data.message,
        success: data.success || false,
      });
      setTimeout(() => {
        setGlobalMessage({ message: "", success: true });
      }, 5000);
    }
  };

  const showNavBar = () => {
    const path = window.location.pathname;
    return (
      path !== "/" && path !== "/create-hacker" && path !== "/create-hacker/"
    );
  };
  return (
    <div className="App text-light">
      {showNavBar() && (
        <>
          <NavbarComp
            updateGlobalValues={updateGlobalValues}
            loading={loading}
            messages={messages}
            user={user}
          />
          <StatusBar loading={loading} user={user} />
          <div className="globalMessage">
            {globalMessage.message && (
              <Typist
                avgTypingDelay={5}
                className={`terminalFont ${
                  globalMessage.success
                    ? "terminalTextGreen"
                    : "terminalTextLost"
                }`}
                cursor={{ hideWhenDone: true }}
              >
                {globalMessage.message}
              </Typist>
            )}
          </div>
        </>
      )}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/alliance/create"
          render={(props) => (
            <CreateAlliance
              {...props}
              loading={loading}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route path="/alliance/ladder" component={AllianceLadder} />
        <Route path="/alliance/:id" component={AllianceOverview} />
        <Route
          path="/create-hacker"
          render={() => <CreateHacker loading={loading} user={user} />}
        />
        <Route
          path="/datacenters"
          render={() => (
            <DataCenters
              loading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/forum/:forumId/:threadId"
          render={() => <ForumThread loading={loading} user={user} />}
        />

        <Route
          path="/earn-battery"
          render={() => (
            <EarnBattery
              glo
              loading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route path="/forum/:forumId" render={() => <ThreadOverview />} />
        <Route
          path="/forum"
          render={() => <ForumOverview loading={loading} user={user} />}
        />
        <Route
          path="/hack-crimes"
          render={() => <HackCrimes updateGlobalValues={updateGlobalValues} />}
        />
        <Route
          path="/hacker/:id"
          render={(props) => (
            <HackerProfile {...props} updateGlobalValues={updateGlobalValues} />
          )}
        />
        <Route
          path="/locals"
          render={() => <Locals loading={loading} user={user} />}
        />

        <Route
          path="/my-profile"
          render={() => (
            <MyProfile
              loading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route
          path="/petty-hacker"
          render={() => (
            <Petty
              loading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route path="/marketplace" component={Marketplace} />
        <Route
          path="/wanted-list"
          render={() => <WantedList updateGlobalValues={updateGlobalValues} />}
        />
        <Route
          path="/cryptocurrency"
          render={() => <CryptoCurrency loading={loading} user={user} />}
        />
        <Route
          path="/vpn"
          render={() => (
            <VPN
              updateGlobalValues={updateGlobalValues}
              loading={loading}
              user={user}
            />
          )}
        />
        <Route path="/system-repair" component={SystemRepair} />
        <Route path="/ladder" component={Ladder} />
        <Route
          path="/ledger"
          render={() => <Ledger loading={loading} user={user} />}
        />
        <Route path="/information" component={Information} />
        <Route
          path="/messages"
          render={() => <MessageCenter loading={loading} messages={messages} />}
        />

        <Route path="/notifications" component={Notifications} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
