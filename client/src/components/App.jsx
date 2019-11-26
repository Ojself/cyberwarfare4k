import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";

import Arcade from "./pages/Arcade";
import Alliance from "./pages/Alliance";
import AllianceLadder from "./pages/AllianceLadder";
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
import Notifications from "./pages/Notifications";
import Petty from "./pages/Petty";
import Secret from "./pages/Secret";

// NOT NEEDED. SEE HOME.JSX
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StatusBar from "./pages/smaller/statusbar";
import SystemRepair from "./pages/SystemRepair";
import VPN from "./pages/VPN";
import WantedList from "./pages/WantedList";

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

const App = () => {
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
  }, []);

  const checkCommunicationtot = () => {
    return (
      checkCommunication("messages") || checkCommunication("notifications")
    );
  };

  const checkCommunication = com => {
    return appState.loading ? false : appState.user.account[com][0][1];
  };

  const toggle = () => {
    SetAppState({
      ...appState,
      isOpen: !appState.isOpen
    });
  };

  const handleLogoutClick = e => {
    api.logout();
  };

  const rankChecker = reqLevel => {
    const { rank } = appState.loading ? 1 : appState.user.playerStats;
    return reqLevel >= rank;
  };

  const currentCity = appState.loading
    ? "City"
    : appState.user.playerStats.city.name;
  /* TODO: This will cause error cause no default city is set */

  return (
    <div>
      <div className="App ">
        {/* extract this into another component (navbar) */}
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">CHW4K</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={appState.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/create-hacker">Create</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Info
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/my-profile">My Profile</DropdownItem>

                  <DropdownItem href="/ladder">Top Hackers</DropdownItem>
                  <DropdownItem href="/alliance-ladder">
                    Top Alliances
                  </DropdownItem>
                  <DropdownItem href="/wanted-list">
                    Wanted Hackers
                  </DropdownItem>
                  <DropdownItem href="/arcade">Arcade</DropdownItem>
                  <DropdownItem href="/information">Information</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hack
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/petty-hacker">Petty</DropdownItem>
                  <DropdownItem href="/hack-crimes">Crime</DropdownItem>
                  <DropdownItem>Organized Crime</DropdownItem>
                  <DropdownItem href="/">Hack player</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Alliance
                </DropdownToggle>
                {appState.user && appState.user.alliance ? (
                  <DropdownMenu right>
                    <DropdownItem href="/">Overview</DropdownItem>
                    <DropdownItem href="/">Leave Alliance</DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu id="allianceCreateNav" right>
                    <DropdownItem href="/" disabled={rankChecker(4)}>
                      Create..
                    </DropdownItem>
                    <UncontrolledTooltip
                      placement="top"
                      target="allianceCreateNav"
                    >
                      {rankChecker(4) &&
                        "You are too unexperienced to create your own alliance"}
                    </UncontrolledTooltip>
                  </DropdownMenu>
                )}
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {currentCity}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/locals">Local Hackers</DropdownItem>
                  <DropdownItem href="/datacenters">Datacenters</DropdownItem>
                  {/* <DropdownItem divider /> */}
                  <DropdownItem href="/vpn">VPN</DropdownItem>
                  <DropdownItem href="/cryptocurrency">
                    Crypto Currency
                  </DropdownItem>
                  <DropdownItem href="/marketplace">Marketplace</DropdownItem>
                  <DropdownItem>Chip Chop Shop</DropdownItem>
                  <DropdownItem href="/ledger">Ledger</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  style={{
                    color: checkCommunicationtot() ? "red" : null
                  }}
                  nav
                  caret
                >
                  Communication
                </DropdownToggle>
                <DropdownMenu right>
                  {appState.user && appState.user.alliance && (
                    <>
                      <DropdownItem>Alliance Forum</DropdownItem>
                      <DropdownItem divider />
                    </>
                  )}
                  <DropdownItem>Public Forum</DropdownItem>
                  <DropdownItem
                    style={{
                      color: checkCommunication("messages") ? "red" : null
                    }}
                    href="/messages"
                  >
                    Messages
                  </DropdownItem>
                  <DropdownItem
                    style={{
                      color: checkCommunication("notifications") ? "red" : null
                    }}
                    href="/notifications"
                  >
                    Notifications
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {!api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/signup">Signup</NavLink>
                </NavItem>
              )}
              {!api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              )}
              {api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/" onClick={e => handleLogoutClick(e)}>
                    Logout
                    <p style={{ fontSize: "0.5em" }}>sudo rm -rf </p>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
        <StatusBar loading={appState.loading} user={appState.user} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/alliance" component={Alliance} />
          <Route path="/alliance-ladder" component={AllianceLadder} />
          <Route path="/arcade" component={Arcade} /> {/* remove? */}
          <Route path="/datacenters" component={DataCenters} />
          <Route path="/create-hacker" component={CreateHacker} />
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
          <Route path="/login" component={Login} />
          <Route
            path="/messages"
            render={() => (
              <MessageCenter loading={appState.loading} user={appState.user} />
            )}
          />
          <Route path="/minigame" component={MiniGame} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/signup" component={Signup} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
