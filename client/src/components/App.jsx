import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";
import Typist from "react-typist";

import AllianceLadder from "./pages/alliance/pages/Ladder";
import AllianceOverview from "./pages/alliance/pages/AllianceOverview";
import ChipChopShop from "./pages/chipchopshop/ChipChopShop";
import CreateHacker from "./pages/createHacker/CreateHacker";
import CreateAlliance from "./pages/alliance/pages/CreateAlliance";
import CryptoCurrency from "./pages/cryptoCurrency/CryptoCurrency";
import Dashboard from "./pages/alliance/pages/Dashboard"
import DataCenters from "./pages/DataCenters";
import Footer from "./pages/header-footer/Footer";
import ThreadOverview from "./pages/globalForum/ThreadOverview";
import ForumOverview from "./pages/globalForum/ForumOverview";
import ForumThread from "./pages/globalForum/ForumThread";
import EarnBattery from "./pages/earnBattery/EarnBattery";
import HackerProfile from "./pages/hackerProfile/HackerProfile";
import HackCrimes from "./pages/crimes/crimes/HackCrimes";
import Home from "./pages/home/Home";
import Information from "./pages/Information";
import Ladder from "./pages/Ladder";
import Locals from "./pages/Locals";
import Ledger from "./pages/Ledger";
import Marketplace from "./pages/marketplace/Marketplace";
import MyProfile from "./pages/myProfile/MyProfile";
import MessageCenter from "./pages/communication/MessageCenter";
import NavbarComp from "./pages/header-footer/Navbar";
import Notifications from "./pages/communication/Notifications";
import Petty from "./pages/crimes/petty/Petty";
import StatusBar from "./pages/header-footer/Statusbar";
import ServiceAndSupport from "./pages/ServiceAndSupport";
import VPN from "./pages/VPN";
import WantedList from "./pages/WantedList";

const App = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [globalMessage, setGlobalMessage] = useState({});
  const [loading, setLoading] = useState(true);

  const userIsAtStarPage = () => {
    const path = window.location.pathname;
    return (
      path === "/" || path === "/create-hacker" || path === "/create-hacker/"
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let data;
      try{
        data = await api.getUser()
      }catch(err){
        console.log('error fetching user data', err)
        return
      }
      if (!data.user.account.isSetup && !userIsAtStarPage()){
        window.location.pathname = "/create-hacker";
      }
      setUser(data.user);
      setMessages(data.messages);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const updateGlobalValues = (data, renderMessage = true, scrollToTop = false) => {
    console.log("updating global", data);

    if (data.user) {
      setUser(data.user);
    }
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  
  return (
    <div className="App text-light">
      {!userIsAtStarPage() && (
        <>
          <NavbarComp
            updateGlobalValues={updateGlobalValues}
            globalLoading={loading}
            messages={messages}
            user={user}
          />
          <StatusBar globalLoading={loading} user={user} />
          <div className="globalMessage">
            {globalMessage.message && (
              <Typist
                avgTypingDelay={5}
                className={`terminalFont ${
                  globalMessage.success
                    ? "terminalTextwin"
                    : "terminalTextlost"
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
              globalLoading={loading}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route path="/alliance/ladder" component={AllianceLadder} />
        <Route
          path="/alliance/dashboard"
          render={() => <Dashboard globalLoading={loading} />}
        />
        <Route path="/alliance/:id" component={AllianceOverview} />
        <Route
          path="/chipchopshop"
          render={() => (
            <ChipChopShop
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
          path="/forum/:forumId/:threadId"
          render={() => <ForumThread globalLoading={loading} user={user} />}
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
        <Route path="/forum/:forumId" render={() => <ThreadOverview />} />
        <Route
          path="/forum"
          render={() => <ForumOverview globalLoading={loading} user={user} />}
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
          path="/petty-hacker"
          render={() => (
            <Petty
              globalLoading={loading}
              user={user}
              updateGlobalValues={updateGlobalValues}
            />
          )}
        />
        <Route path="/information" component={Information} />
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
              updateGlobalValues={updateGlobalValues}
              globalLoading={loading}
              messages={messages}
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
          render={() => <WantedList updateGlobalValues={updateGlobalValues} />}
        />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
