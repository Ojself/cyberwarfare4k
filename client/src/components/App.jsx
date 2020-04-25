import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";

import Alliance from "./pages/alliance/pages/Alliance";
import AllianceLadder from "./pages/alliance/pages/Ladder";
import CryptoCurrency from "./pages/cryptoCurrency/CryptoCurrency";
import CreateHacker from "./pages/createHacker/CreateHacker";
import DataCenters from "./pages/DataCenters";
import Footer from "./pages/header-footer/Footer";
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

import images from "./pages/_helpers/images";

const App = (props) => {
  const [appState, SetAppState] = useState({
    isOpen: false,
    loading: true,
    user: null,
  });

  useEffect(async () => {
    const apiUser = await api.getNavUser();
    SetAppState({
      ...appState,
      user: apiUser.user,
      loading: false,
    });
  }, []);

  const loggedInAndSetup = () => {
    return api.isLoggedIn() && api.isSetup();
  };

  return (
    <div>
      <div className="App text-light">
        {loggedInAndSetup() ? (
          <>
            <NavbarComp loading={appState.loading} user={appState.user} />
            <StatusBar loading={appState.loading} user={appState.user} />
          </>
        ) : (
          <div>
            <img
              id="navbarReplacer"
              src={images.utilImages[3].src}
              alt="Cyber Header"
            />
          </div>
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
          <Route path="/hack-crimes" component={HackCrimes} />
          <Route path="/hack-player" component={HackPlayer} />
          <Route path="/hacker/:id" component={HackerProfile} />
          <Route
            path="/locals"
            render={() => (
              <Locals loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/my-profile" component={MyProfile} />
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
              <MessageCenter loading={appState.loading} user={appState.user} />
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
