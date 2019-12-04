import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";

import Arcade from "./pages/Arcade";
import Alliance from "./pages/alliance/Alliance";
import AllianceLadder from "./pages/alliance/Ladder";
import CryptoCurrency from "./pages/CryptoCurrency";
import CreateHacker from "./pages/CreateHacker";
import DataCenters from "./pages/DataCenters";
import HackerProfile from "./pages/HackerProfile";
import HackCrimes from "./pages/HackCrimes";
import HackPlayer from "./pages/HackPlayer";
import Home from "./pages/home/Home";
import Information from "./pages/Information";
import Ladder from "./pages/Ladder";
import Locals from "./pages/Locals";
import Ledger from "./pages/Ledger";

import Marketplace from "./pages/Marketplace";
import MiniGame from "./pages/minigame/MiniGame";
import MyProfile from "./pages/MyProfile";
import MessageCenter from "./pages/MessageCenter";
import NavbarComp from "./pages/Navbar";
import Notifications from "./pages/Notifications";
import Petty from "./pages/Petty";
import Secret from "./pages/Secret";

import StatusBar from "./pages/smaller/statusbar";
import SystemRepair from "./pages/SystemRepair";
import VPN from "./pages/VPN";
import WantedList from "./pages/WantedList";

import images from "./utils/images.js";

// styling
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";

const App = props => {
  const [appState, SetAppState] = useState({
    isOpen: false,
    loading: true,
    user: null
  });

  useEffect(async () => {
    const apiUser = await api.getNavUser();
    SetAppState({
      ...appState,
      user: apiUser.user,
      loading: false
    });
  }, [console.log(props, "props")]);

  const checkAll = () => {
    return api.isLoggedIn() && api.isSetup();
  };

  return (
    <div>
      <div className="App text-light">
        {checkAll() ? (
          <>
            <NavbarComp loading={appState.loading} user={appState.user} />
            <StatusBar loading={appState.loading} user={appState.user} />
          </>
        ) : (
          <div>
            <img id="navbarReplacer" src={images.utilImages[3].src} alt="" />
          </div>
        )}

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/alliance" component={Alliance} />
          <Route path="/alliance-ladder" component={AllianceLadder} />
          <Route path="/arcade" component={Arcade} /> {/* remove? */}
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
          <Route path="/locals" component={Locals} />
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
          <Route path="/minigame" component={MiniGame} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
