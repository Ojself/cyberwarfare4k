import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";

import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import HackCrimes from "./pages/HackCrimes";
import HackPlayer from "./pages/HackPlayer";
import WantedList from "./pages/WantedList";
import Alliance from "./pages/Alliance";
import SystemRepair from "./pages/SystemRepair";
import Marketplace from "./pages/Marketplace";
import Information from "./pages/Information";
import Ladder from "./pages/Ladder";
import Arcade from "./pages/Arcade";
import CreateHacker from "./pages/CreateHacker";
import Petty from "./pages/Petty";
import CryptoCurrency from "./pages/CryptoCurrency";
import VPN from "./pages/VPN";
import DataCenters from "./pages/DataCenters";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StatusBar from "./pages/smaller/statusbar";

// styling
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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

  const toggle = () => {
    SetAppState({
      ...appState,
      isOpen: !appState.isOpen
    });
  };

  const handleLogoutClick = e => {
    api.logout();
  };

  const currentCity = appState.loading
    ? "City"
    : appState.user.playerStats.city
        .name; /* TODO: This will cause error cause no default city is set */

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
                  <DropdownItem>My profile</DropdownItem>
                  <DropdownItem>
                    My alliance {/* appState.user.alliance.name? */}
                  </DropdownItem>
                  <DropdownItem>Top Hackers</DropdownItem>
                  <DropdownItem>Top Alliances</DropdownItem>
                  <DropdownItem href="/wanted-list">Wanted</DropdownItem>
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
                  {/* <DropdownItem divider /> */}
                  <DropdownItem>Organized Crime</DropdownItem>
                  <DropdownItem>Hack players</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {currentCity}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Locals</DropdownItem>
                  <DropdownItem href="/datacenters">Datacenters</DropdownItem>
                  {/* <DropdownItem divider /> */}
                  <DropdownItem href="/vpn">VPN</DropdownItem>
                  <DropdownItem href="/cryptocurrency">
                    Crypto Currency
                  </DropdownItem>
                  <DropdownItem href="/marketplace">Marketplace</DropdownItem>
                  <DropdownItem>Chip Chop Shop</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Forum
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Alliance</DropdownItem>
                  {/* <DropdownItem divider /> */}
                  <DropdownItem>Public</DropdownItem>
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
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
        <StatusBar loading={appState.loading} user={appState.user} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path="/create-hacker" component={CreateHacker} />
          <Route path="/petty-hacker" component={Petty} />
          <Route path="/hack-crimes" component={HackCrimes} />
          <Route path="/hack-player" component={HackPlayer} />
          <Route path="/wanted-list" component={WantedList} />
          <Route path="/alliance" component={Alliance} />
          <Route path="/marketplace" component={Marketplace} />
          <Route
            path="/cryptocurrency"
            render={() => (
              <CryptoCurrency loading={appState.loading} user={appState.user} />
            )}
          />

          <Route path="/vpn" render={() => <VPN user={appState.user} />} />
          <Route path="/system-repair" component={SystemRepair} />
          <Route path="/ladder" component={Ladder} />
          <Route path="/datacenters" component={DataCenters} />
          <Route path="/information" component={Information} />
          <Route path="/arcade" component={Arcade} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
