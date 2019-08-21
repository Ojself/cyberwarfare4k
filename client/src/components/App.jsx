import React, { Component } from 'react';
import { Route, Link, NavLink as NavLinkRR, Switch } from 'react-router-dom';

import Home from './pages/Home';

/* Hacker specific imports */
import MyProfile from './pages/MyProfile';
import HackCrimes from './pages/HackCrimes';
import HackPlayer from './pages/HackPlayer';
import WantedList from './pages/WantedList';
import Alliance from './pages/Alliance';
import SystemRepair from './pages/SystemRepair';
import Marketplace from './pages/Marketplace';
import Information from './pages/Information';
import Ladder from './pages/Ladder';
import Arcade from './pages/Arcade';
import CreateHacker from './pages/CreateHacker';
import Petty from './pages/Petty';
import CryptoCurrency from './pages/CryptoCurrency';

import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../logo.svg';

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
} from 'reactstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loading: true,
      user: null
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    api
      .getNavUser()
      .then(result => {
        this.setState({ user: result.user, loading: false });
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div>
        <div className='App '>
          {/* extract this into another component (navbar) */}
          <Navbar color='light' light expand='md'>
            <NavbarBrand href='/'>reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='/create-hacker'>Create</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Info
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>My profile</DropdownItem>
                    <DropdownItem>
                      My alliance {/* this.state.user.alliance.name? */}
                    </DropdownItem>
                    <DropdownItem>Top Hackers</DropdownItem>
                    <DropdownItem>Top Alliances</DropdownItem>
                    <DropdownItem>Wanted List</DropdownItem>
                    <DropdownItem>Arcade</DropdownItem>
                    <DropdownItem>Information</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hack
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Petty</DropdownItem>
                    <DropdownItem>Crime</DropdownItem>
                    {/* <DropdownItem divider /> */}
                    <DropdownItem>Organized Crime</DropdownItem>
                    <DropdownItem>Hack players</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hanoi {/* this.state.user.city.name  */}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Locals</DropdownItem>
                    <DropdownItem>Datacenters</DropdownItem>
                    {/* <DropdownItem divider /> */}
                    <DropdownItem>VPN</DropdownItem>
                    <DropdownItem>Crypto Currency</DropdownItem>
                    <DropdownItem>Marketplace</DropdownItem>
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
              </Nav>
            </Collapse>
          </Navbar>
          <header className='App-header '>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>CYBERHACKER WARFARE 4000</h1>
            {this.state.loading ? (
              <p>loading</p>
            ) : (
              <>
                {/* icon instead of text? */}
                <div>Battery: {this.state.user.playerStats.battery}%</div>
                <div>
                  Firewall{' '}
                  {(
                    (this.state.user.playerStats.currentFirewall /
                      this.state.user.playerStats.maxFirewall) *
                    100
                  ).toFixed(0)}
                  %
                </div>
                <div>
                  BTCs: {Math.floor(this.state.user.playerStats.bitCoins)}
                </div>
                <div>
                  Exp: {this.state.user.playerStats.exp} /{' '}
                  {this.state.user.playerStats.expToLevel}
                </div>
                <div>{this.state.user.playerStats.rankName}</div>
              </>
            )}
            <NavLinkRR to='/' exact>
              Home
            </NavLinkRR>
            <NavLinkRR to='/my-profile'>My profile</NavLinkRR>
            <NavLinkRR to='/create-hacker'>Create</NavLinkRR>
            <NavLinkRR to='/petty-hacker'>Petty </NavLinkRR>
            <NavLinkRR to='/hack-crimes'>Hack Crimes</NavLinkRR>
            <NavLinkRR to='/hack-player'>Hack Player</NavLinkRR>
            <NavLinkRR to='/wanted-list'>Wanted List</NavLinkRR>
            <NavLinkRR to='/alliance'>Alliance</NavLinkRR>
            <NavLinkRR to='/marketplace'>Marketplace</NavLinkRR>
            <NavLinkRR
              to={{ pathname: '/cryptocurrency', state: { foo: 'bar' } }}
            >
              CryptoCurrency
            </NavLinkRR>
            <NavLinkRR to='/system-repair'>System Repair</NavLinkRR>
            <NavLinkRR to='/ladder'>Ladder</NavLinkRR>
            <NavLinkRR to='/information'>Information</NavLinkRR>
            <NavLinkRR to='/arcade'>Arcade</NavLinkRR>
            {!api.isLoggedIn() && <NavLinkRR to='/signup'>Signup</NavLinkRR>}
            {!api.isLoggedIn() && <NavLinkRR to='/login'>Login</NavLinkRR>}
            {api.isLoggedIn() && (
              <Link to='/' onClick={e => this.handleLogoutClick(e)}>
                logout
              </Link>
            )}
            <NavLinkRR to='/secret'>Admin menu</NavLinkRR>
          </header>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/my-profile' component={MyProfile} />
            <Route path='/create-hacker' component={CreateHacker} />
            <Route path='/petty-hacker' component={Petty} />
            <Route path='/hack-crimes' component={HackCrimes} />
            <Route path='/hack-player' component={HackPlayer} />
            <Route path='/wanted-list' component={WantedList} />
            <Route path='/alliance' component={Alliance} />
            <Route path='/marketplace' component={Marketplace} />
            <Route
              path='/cryptocurrency'
              render={() => (
                <CryptoCurrency
                  propsloading={this.state.loading}
                  propsuser={this.state.user}
                />
              )}
            />

            <Route path='/system-repair' component={SystemRepair} />
            <Route path='/ladder' component={Ladder} />
            <Route path='/information' component={Information} />
            <Route path='/arcade' component={Arcade} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/secret' component={Secret} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}
