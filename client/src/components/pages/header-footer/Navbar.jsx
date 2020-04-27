import React, { useState, useEffect } from "react";
import api from "../../../api";

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

const NavbarComp = (props) => {
  const [toolOpen, setToolOpen] = useState(false);

  const currentCity = props.loading ? "City" : props.user.playerStats.city.name;

  const handleLogoutClick = (e) => {
    api.logout();
  };

  const checkAllCommunication = () => {
    return checkInbox() /* || checkCommunication("notifications") */;
  };

  const checkInbox = () => {
    if (props.loading) {
      return false;
    }
    return props.messages.inbox.length && !props.messages.inbox[0].read;
  };

  const toggle = () => {
    setToolOpen(!toolOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">CHW4K</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={props.isOpen} navbar>
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
                <DropdownItem href="/wanted-list">Wanted Hackers</DropdownItem>
                {/* <DropdownItem href='/arcade'>Arcade</DropdownItem> */}
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
              {props.user && props.user.alliance ? (
                <DropdownMenu right>
                  <DropdownItem href="/">Overview</DropdownItem>
                  <DropdownItem href="/">Leave Alliance</DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu id="allianceCreateNav" right>
                  <DropdownItem href="/alliance/create">Create..</DropdownItem>
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
                  color: checkAllCommunication() ? "red" : null,
                }}
                nav
                caret
              >
                Communication
              </DropdownToggle>
              <DropdownMenu right>
                {props.user && props.user.alliance && (
                  <>
                    <DropdownItem>Alliance Forum</DropdownItem>
                    <DropdownItem divider />
                  </>
                )}
                <DropdownItem>Public Forum</DropdownItem>
                <DropdownItem
                  style={{
                    color: checkInbox("messages") ? "red" : null,
                  }}
                  href="/messages"
                >
                  Messages
                </DropdownItem>
                <DropdownItem
                  style={
                    {
                      /* color: checkCommunication("notifications") ? "red" : null, */
                    }
                  }
                  href="/notifications"
                >
                  Notifications
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* todo, probably dont need this because you wont see the navbar anyway */}
            {api.isLoggedIn() && (
              <NavItem>
                <NavLink href="/" onClick={(e) => handleLogoutClick(e)}>
                  Logout
                  <p style={{ fontSize: "0.5em" }}>sudo rm -rf </p>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarComp;
