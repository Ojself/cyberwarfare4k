import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import api from "../api";

import Alliance from "./pages/alliance/pages/Alliance";
import AllianceLadder from "./pages/alliance/pages/Ladder";
import CryptoCurrency from "./pages/cryptoCurrency/CryptoCurrency";
import CreateHacker from "./pages/createHacker/CreateHacker";
import DataCenters from "./pages/DataCenters";
import Footer from "./pages/header-footer/Footer";
import ThreadOverview from "./pages/globalForum/ThreadOverview";
import ForumOverview from "./pages/globalForum/ForumOverview";
import ForumThread from "./pages/globalForum/ForumThread";
import HackerProfile from "./pages/HackerProfile";
import HackCrimes from "./pages/crimes/crimes/HackCrimes";
import HackPlayer from "./pages/HackPlayer";
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

const App = (props) => {
  const [appState, SetAppState] = useState({
    isOpen: false,
    loading: true,
    messages: null,
    user: null,
  });

  useEffect(async () => {
    async function fetchUserData() {
      const apiUser = await api.getUser();

      SetAppState({
        ...appState,
        user: apiUser.user,
        messages: apiUser.messages,
        loading: false,
      });
    }
    fetchUserData();
  }, []);

  const setUser = (user) => {
    SetAppState({
      ...appState,
      user: user,
      loading: false,
    });
  };

  const showNavBar = () => {
    const path = window.location.pathname;

    if (
      path === "/" ||
      path === "/create-hacker" ||
      path === "/create-hacker/"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="App text-light">
        {showNavBar() && (
          <>
            <NavbarComp
              loading={appState.loading}
              messages={appState.messages}
              user={appState.user}
            />
            <StatusBar loading={appState.loading} user={appState.user} />
          </>
        )}

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/alliance" component={Alliance} />
          <Route path="/alliance-ladder" component={AllianceLadder} />
          <Route
            path="/create-hacker"
            render={() => (
              <CreateHacker loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/datacenters" component={DataCenters} />
          <Route
            path="/forum/:forumId/:threadId"
            render={() => (
              <ForumThread loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/forum/:forumId" render={() => <ThreadOverview />} />
          <Route
            path="/forum"
            render={() => (
              <ForumOverview loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/hack-crimes" component={HackCrimes} />
          <Route path="/hack-player" component={HackPlayer} />
          <Route path="/hacker/:id" component={HackerProfile} />
          <Route
            path="/locals"
            render={() => (
              <Locals loading={appState.loading} user={appState.user} />
            )}
          />

          <Route
            path="/my-profile"
            render={() => (
              <MyProfile
                loading={appState.loading}
                user={appState.user}
                setUser={setUser}
              />
            )}
          />
          <Route path="/petty-hacker" component={Petty} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/wanted-list" component={WantedList} />
          <Route
            path="/cryptocurrency"
            render={() => (
              <CryptoCurrency loading={appState.loading} user={appState.user} />
            )}
          />
          <Route
            path="/vpn"
            render={() => (
              <VPN loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/system-repair" component={SystemRepair} />
          <Route path="/ladder" component={Ladder} />
          <Route
            path="/ledger"
            render={() => (
              <Ledger loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/information" component={Information} />
          <Route
            path="/messages"
            render={() => (
              <MessageCenter
                loading={appState.loading}
                messages={appState.messages}
              />
            )}
          />

          <Route path="/notifications" component={Notifications} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
};

export default App;
