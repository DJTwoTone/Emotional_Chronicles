// import logo from './logo.svg';
import React, { useState } from 'react';
import Header from './Header';
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage'
import { decode } from 'jsonwebtoken';
import { ECApi } from './ECApi';

import { makeStyles } from '@material-ui/core/styles'

import './App.css';

const useStyles = makeStyles({});

export const TOKEN_ID = 'usertoken';

function App() {

  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await ECA



        
      } catch (e) {
        setCurrentUser(null);
      }
    }
  })

  return (
    <div className={classes.container}>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
