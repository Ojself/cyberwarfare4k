import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

import Home from './pages/Home';
/* import Countries from "./pages/Countries";
import AddCountry from "./pages/AddCountry"; */

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

import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>CYBERHACKER WARFARE 4000</h1>
          <NavLink to='/' exact>
            Home
          </NavLink>
          <NavLink to='/my-profile'>My profile</NavLink>
          <NavLink to='/hack-crimes'>Hack Crimes</NavLink>
          <NavLink to='/hack-player'>Hack Player</NavLink>
          <NavLink to='/wanted-list'>Wanted List</NavLink>
          <NavLink to='/alliance'>Alliance</NavLink>
          <NavLink to='/marketplace'>Marketplace</NavLink>
          <NavLink to='/system-repair'>System Repair</NavLink>
          <NavLink to='/ladder'>Ladder</NavLink>
          <NavLink to='/information'>Information</NavLink>
          <NavLink to='/arcade'>Arcade</NavLink>
          {!api.isLoggedIn() && <NavLink to='/signup'>Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to='/login'>Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to='/' onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
          <NavLink to='/secret'>Admin menu</NavLink>
          {/* PLAYER STATS GOES HERE */}
          <div style={{ color: 'black ' }}>
            {' '}
            PLAYER STATS GOES HERE: playername, rank, btc, battery, firewall exp
          </div>
        </header>
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/countries' component={Countries} />
          <Route path='/add-country' component={AddCountry} /> */}
          {/* Hacker specific */}
          <Route path='/my-profile' component={MyProfile} />
          <Route path='/hack-crimes' component={HackCrimes} />
          <Route path='/hack-player' component={HackPlayer} />
          <Route path='/wanted-list' component={WantedList} />
          <Route path='/alliance' component={Alliance} />
          <Route path='/marketplace' component={Marketplace} />
          <Route path='/system-repair' component={SystemRepair} />
          <Route path='/ladder' component={Ladder} />
          <Route path='/information' component={Information} />
          <Route path='/arcade' component={Arcade} />
          {/* Hacker specific end */}
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/secret' component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
