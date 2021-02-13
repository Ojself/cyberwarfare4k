import React, { useState } from "react";
import api from "../../../api";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faMoneyBillAlt,
  faCity,
  faComments,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faRedhat } from "@fortawesome/free-brands-svg-icons";
import Clock from "../_molecules/Clock";

import { Link } from "react-router-dom";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

const NavbarComp = ({
  globalLoading,
  unreadMessage,
  unreadNotification,
  user,
}) => {
  const currentCity = globalLoading ? "City" : user.playerStats.city.name;

  const handleLogoutClick = () => {
    api.logout();
  };

  const [prizeModal, setPrizeModal] = useState(false);
  const togglePrizeModal = () => {
    console.log("modal");
    setPrizeModal(!prizeModal);
  };

  const userHasUnreadNotification = () => {
    return userHasMail() || userHasNotification();
  };
  const userHasNotification = () => {
    if (globalLoading) return false;
    return unreadNotification;
  };

  const userHasMail = () => {
    if (globalLoading) return false;
    return unreadMessage;
  };

  return (
    <div>
      <Navbar color="dark" className="navbar-main" expand="xs">
        <div>
          <div style={{ cursor: "pointer" }}>
            <p
              onClick={togglePrizeModal}
              className="text-success mb-0"
              style={{ fontSize: "0.75rem" }}
            >
              <strong>PRIZES </strong>
              <span role="img" aria-label="trophy-icon">
                🏆
              </span>
            </p>
            <Modal isOpen={prizeModal} toggle={togglePrizeModal}>
              <ModalHeader toggle={togglePrizeModal}>
                <p className="text-warning font-weight-bold">PRIZES</p>
              </ModalHeader>
              <ModalBody>
                <strong>WEALTHIEST HACKERS </strong>

                <span role="img" aria-label="Gold medal">
                  🏅
                </span>

                <p>
                  The top 3 hackers will be awarded with profile decoration and{" "}
                  <Link className="text-light font-weight-bold" to="/tokens">
                    tokens
                  </Link>{" "}
                  for he or she to use in the next round!
                </p>
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <span role="img" aria-label="1st medal">
                      🥇
                    </span>
                    2000 tokens
                  </li>
                  <li>
                    <span role="img" aria-label="2nd medal">
                      🥈
                    </span>
                    750 tokens
                  </li>
                  <li>
                    <span role="img" aria-label="3rd medal">
                      🥉
                    </span>
                    250 tokens
                  </li>
                </ul>
                <strong>WEALTHIEST ALLIANCE </strong>
                <span role="img" aria-label="Hat emoji">
                  🎩
                </span>
                <p>
                  The wealthiest alliance by the end of the round will be
                  awarded with{" "}
                  <Link className="text-light font-weight-bold" to="/tokens">
                    tokens
                  </Link>
                  .
                </p>
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <span role="img" aria-label="Computer Laptop">
                      💻 300 tokens for each member
                    </span>
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <div>
                  <p className="my-0">The round will end 7th of March</p>
                  <p style={{ fontSize: "0.75rem" }}>
                    Terms and conditions will be announced
                  </p>
                </div>
              </ModalFooter>
              <ModalFooter>
                <Button color="primary" onClick={togglePrizeModal}>
                  Take me back!
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <NavbarBrand
            href="/my-profile"
            className="mr-auto display-none-when-mobile"
          >
            <p className="text-warning mb-0" style={{ fontSize: "0.75rem" }}>
              Current round: <strong>3</strong>
            </p>
          </NavbarBrand>
        </div>

        <Nav className="m-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret className="dropdown-button" nav>
              <FontAwesomeIcon className="text-light" icon={faInfo} />
              <span className="display-none-when-mobile"> Info</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/my-profile">My Profile</DropdownItem>
              <DropdownItem href="/ladder">Top Hackers</DropdownItem>
              <DropdownItem href="/wanted-list">Wanted Hackers</DropdownItem>
              <DropdownItem href="/information">Information & FAQ</DropdownItem>
              <DropdownItem href="/hall-of-fame">Hall Of Fame</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/earn-battery">
                <span role="img" aria-label="battery">
                  &#9889;
                </span>{" "}
                Earn Battery
              </DropdownItem>
              <DropdownItem href="/tokens">
                <span role="img" aria-label="battery">
                  &#9889;
                </span>{" "}
                Token store
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret className="dropdown-button" nav>
              <FontAwesomeIcon className="text-light" icon={faMoneyBillAlt} />
              <span className="display-none-when-mobile"> Hack</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/petty-hacker">Petty</DropdownItem>
              <DropdownItem href="/crimes">Crime</DropdownItem>
              <DropdownItem href="/org-crimes">Organized Crime</DropdownItem>
              <DropdownItem href="/datacenters">Datacenters</DropdownItem>
              <DropdownItem href="/espionage">Espionage</DropdownItem>
              <DropdownItem href="/locals">Hack player</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret className="dropdown-button" nav>
              <FontAwesomeIcon className="text-light" icon={faRedhat} />
              <span className="display-none-when-mobile"> Alliance</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/alliance/ladder">Top Alliances</DropdownItem>
              {user && user.alliance ? (
                <>
                  <DropdownItem
                    href={`/alliance/${user.alliance._id}/beta-forum`}
                  >
                    Forum
                  </DropdownItem>
                  <DropdownItem href={`/alliance/dashboard`}>
                    Dashboard
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem href="/alliance/create">Create..</DropdownItem>
                </>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret className="dropdown-button" nav>
              <FontAwesomeIcon className="text-light" icon={faCity} />
              <span className="display-none-when-mobile"> {currentCity}</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/locals">Local Hackers</DropdownItem>
              <DropdownItem href="/service">Service & Support</DropdownItem>
              <DropdownItem href="/vpn">VPN</DropdownItem>
              <DropdownItem href="/cryptocurrency">
                Crypto Currency
              </DropdownItem>
              <DropdownItem href="/marketplace">Marketplace</DropdownItem>
              <DropdownItem href="/funeral">Funeral</DropdownItem>
              <DropdownItem href="/fence">Fence</DropdownItem>
              <DropdownItem href="/ledger">Ledger</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle
              caret
              className={`dropdown-button ${
                userHasUnreadNotification() && "text-danger"
              }`}
              nav
            >
              <FontAwesomeIcon
                className={`text-light ${
                  userHasUnreadNotification() && "text-danger"
                }`}
                icon={faComments}
              />
              <span className="display-none-when-mobile"> Communication</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/beta-forum">Public Forum</DropdownItem>
              <DropdownItem
                className={userHasMail() ? "text-danger" : null}
                href="/messages"
              >
                <span className="display-none-when-mobile"> Messages</span>
              </DropdownItem>
              <DropdownItem
                className={userHasNotification() ? "text-danger" : null}
                href="/notifications"
              >
                Notifications
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className={"dropdown-button"}>
            <NavLink href="/" onClick={(e) => handleLogoutClick(e)}>
              <FontAwesomeIcon className="text-light" icon={faSignOutAlt} />
              <span className="display-none-when-mobile"> Logout</span>
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarBrand href="/" className="display-none-when-mobile ml-auto">
          <Clock />
        </NavbarBrand>
      </Navbar>
    </div>
  );
};
export default NavbarComp;
