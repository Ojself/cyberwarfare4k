import React, { useState } from "react";
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

const NavbarComp = ({ globalLoading, messages, user, updateGlobalValues }) => {
  const [toolOpen, setToolOpen] = useState(false);
  const currentCity = globalLoading ? "City" : user.playerStats.city.name;

  const handleLogoutClick = () => {
    api.logout();
  };

  const checkAllCommunication = () => {
    return userHasMail() || userHasNotification();
  };
  const userHasNotification = () => {
    if (globalLoading) return false;
    return user.account.notifications.some(
      (notification) => notification.read === false
    );
  };

  const userHasMail = () => {
    if (globalLoading) return false;
    return messages.inbox.length && !messages.inbox[0].read;
  };

  const toggle = () => {
    setToolOpen(!toolOpen);
  };

  return (
    <div>
      <Navbar color="dark" expand="md">
        <NavbarBrand href="/">
          <strong className="text-success">CHW4K</strong>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Info
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/my-profile">My Profile</DropdownItem>
                <DropdownItem href="/ladder">Top Hackers</DropdownItem>
                <DropdownItem href="/alliance/ladder">
                  Top Alliances
                </DropdownItem>
                <DropdownItem href="/wanted-list">Wanted Hackers</DropdownItem>
                <DropdownItem href="/earn-battery">
                  Earn Battery{" "}
                  <span role="img" aria-label="battery">
                    &#9889;
                  </span>
                </DropdownItem>
                <DropdownItem href="/information">Information</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Hack
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/petty-hacker">Petty</DropdownItem>
                <DropdownItem href="/hack-crimes">Crime</DropdownItem>
                <DropdownItem disabled>Organized Crime</DropdownItem>
                <DropdownItem href="/datacenters">Datacenters</DropdownItem>
                <DropdownItem href="/locals">Hack player</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Alliance
              </DropdownToggle>
              {user && user.alliance ? (
                <DropdownMenu>
                  <DropdownItem href={`/alliance/${user.alliance._id}`}>
                    Hierarchy
                  </DropdownItem>
                  <DropdownItem href={`/alliance/dashboard`}>
                    Dashboard
                  </DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu id="allianceCreateNav">
                  <DropdownItem href="/alliance/create">Create..</DropdownItem>
                </DropdownMenu>
              )}
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {currentCity}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/locals">Local Hackers</DropdownItem>
                <DropdownItem href="/service">Service & Support</DropdownItem>
                <DropdownItem href="/vpn">VPN</DropdownItem>
                <DropdownItem href="/cryptocurrency">
                  Crypto Currency
                </DropdownItem>
                <DropdownItem href="/marketplace">Marketplace</DropdownItem>
                <DropdownItem href="/chipchopshop">Chip Chop Shop</DropdownItem>
                <DropdownItem href="/ledger">Ledger</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                className={checkAllCommunication() ? "text-danger" : null}
                nav
                caret
              >
                Communication
              </DropdownToggle>
              <DropdownMenu>
                {user && user.alliance && (
                  <>
                    <DropdownItem>Alliance Forum</DropdownItem>
                    <DropdownItem divider />
                  </>
                )}
                <DropdownItem href="/forum">Public Forum</DropdownItem>
                <DropdownItem
                  className={userHasMail() ? "text-danger" : null}
                  href="/messages"
                >
                  Messages
                </DropdownItem>
                <DropdownItem
                  className={userHasNotification() ? "text-danger" : null}
                  href="/notifications"
                >
                  Notifications
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/" onClick={(e) => handleLogoutClick(e)}>
                Logout
                <p style={{ fontSize: "0.5em" }}>sudo rm -rf </p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarComp;      