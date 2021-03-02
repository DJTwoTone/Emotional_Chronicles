import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

import UserContext from './UserContext';
import useLocalStorage from '../hooks/useLocalStorage';
import ECApi from './ECApi';


import './App.css';

import Nav from './Nav';
import Routes from './Routes';


export const LOCAL_STORAGE_TOKEN_ID = 'ec_token'

function App() {

  const [loggedinUser, setLoggedInUser] = useState(null);

  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN_ID)

  useEffect(() => {
    async function getLoggedInUser() {
      try {

        let { username } = decode(token);
        let fetchedUser = await ECApi.getUser(username);
        setLoggedInUser(fetchedUser)


      } catch (err) {
        setLoggedInUser(null)
      }
    }
    getLoggedInUser();
  }, [token]);

  function handleLogout() {
    setLoggedInUser(null);
    setToken(null);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{loggedinUser, setLoggedInUser}}>
          <Nav logout={handleLogout} />
          <Routes setToken={setToken}/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
