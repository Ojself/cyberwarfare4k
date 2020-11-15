import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api";
import Typist from "react-typist";

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

const App = () => {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [globalMessage, setGlobalMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const apiUser = await api.getUser();

      setUser(apiUser.user)
      setMessages(apiUser.messages)
      setLoading(false)
    }
    fetchUserData();
  }, []);

  const updateGlobalValues = (data, renderMessage = true) => {
    console.log('updating global',data)
    if (data.user){
      console.log('setting user')
      setUser(data.user)
    }
    if (renderMessage && data.message){
      setGlobalMessage(data.message)
      setTimeout(() => {
        setGlobalMessage('')
      }, 5000);
    }
  };

  const showNavBar = () => {
    const path = window.location.pathname;
    return path !== "/" &&
      path !== "/create-hacker" &&
      path !== "/create-hacker/"
  };

  return (
      <div className="App text-light">
        {showNavBar() && (
          <>
            <NavbarComp
              loading={loading}
              messages={messages}
              user={user}
            />
            <StatusBar loading={loading} user={user} />
          </>
        )}
        <div className="globalMessage">
          {globalMessage && <Typist className="terminalFont " cursor={{ hideWhenDone: true }}>
          {globalMessage}
        </Typist>}
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/alliance" component={Alliance} />
          <Route path="/alliance-ladder" component={AllianceLadder} />
          <Route
            path="/create-hacker"
            render={() => (
              <CreateHacker loading={loading} user={user} />
            )}
          />
          <Route path="/datacenters" component={DataCenters} />
          <Route
            path="/forum/:forumId/:threadId"
            render={() => (
              <ForumThread loading={loading} user={user} />
            )}
          />
          <Route path="/forum/:forumId" render={() => <ThreadOverview />} />
          <Route
            path="/forum"
            render={() => (
              <ForumOverview loading={loading} user={user} />
            )}
          />
          <Route
             path="/hack-crimes"
             render={()=> (
               <HackCrimes updateGlobalValues={updateGlobalValues} />
             )} />
          <Route path="/hack-player" component={HackPlayer} />
          <Route 
            path="/hacker/:id" component={HackerProfile} />
          <Route
            path="/locals"
            render={() => (
              <Locals loading={loading} user={user} />
            )}
          />

          <Route
            path="/my-profile"
            render={() => (
              <MyProfile
                loading={loading}
                user={user}
                updateGlobalValues={updateGlobalValues}
              />
            )}
          />
          <Route 
          path="/petty-hacker"
          render={()=>(
            <Petty
              updateGlobalValues={updateGlobalValues}
              />
          )}
          />
          <Route path="/marketplace" component={Marketplace} />
          <Route 
            path="/wanted-list" 
            render={()=> (
              <WantedList updateGlobalValues={updateGlobalValues} />
            )} />
          <Route
            path="/cryptocurrency"
            render={() => (
              <CryptoCurrency loading={loading} user={user} />
            )}
          />
          <Route
            path="/vpn"
            render={() => (
              <VPN updateGlobalValues={updateGlobalValues} loading={loading} user={user} />
            )}
          />
          <Route path="/system-repair" component={SystemRepair} />
          <Route path="/ladder" component={Ladder} />
          <Route
            path="/ledger"
            render={() => (
              <Ledger loading={loading} user={user} />
            )}
          />
          <Route path="/information" component={Information} />
          <Route
            path="/messages"
            render={() => (
              <MessageCenter
                loading={loading}
                messages={messages}
              />
            )}
          />

          <Route path="/notifications" component={Notifications} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <Footer />
      </div>
    
  );
};

export default App;
