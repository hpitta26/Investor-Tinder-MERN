import React, { createContext, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //npm i react-router-dom
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Watchlist from './components/pages/Watchlist';
import Investments from './components/pages/Investments';
import UserProfile from './components/UserProfile';
import UPInvest from './components/UPInvest';
import Info from './components/pages/Info';
import Testing from './components/Testing';


export const CurrUserContext = createContext({}) //Used to keep a global state of what card should be displaying

function App() {
  const [user, setUser] = useState(0);

  return (
      <Router>
        <Navbar />
        {/* <h1>Hello</h1> */}

        <CurrUserContext.Provider value={{user: user, setUser: setUser}} > 
          <Routes>
            <Route path='/' element= {<Home />} />
            <Route path='/explore' element= {<Explore />} />
            <Route path='/watchlist' element= {<Watchlist />} />
            <Route path='/investments' element= {<Investments />} />
            <Route path='/info' element= {<Info />} />
            <Route path='/user/:username' element={<UserProfile />} />
            <Route path='/user/:username/invest' element={<UPInvest />} />
            <Route path='/testing' element={<Testing />} />
          </Routes>
        </CurrUserContext.Provider>
        
      </Router>
  );
}

export default App;


// Add footer, Add resizing, Add filtering to watchlist, Add editing to user profiles, implement hamburger menu (user edits their profile)
