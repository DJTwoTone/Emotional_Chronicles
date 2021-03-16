import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, useHistory } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import ECApi from './ECApi';


import './App.css';

import Navigation from './Navigation';
import Routes from './Routes';


export const LOCAL_STORAGE_TOKEN_ID = 'ec_token'

function App() {

  const history = useHistory();

  const [loggedInUser, setLoggedInUser] = useState(null);

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
    // history.push('/');

    return <Redirect to='/' />;

  }


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          <Navigation logout={handleLogout} />
          <Routes setToken={setToken}/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
