// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage'
import { decode } from 'jsonwebtoken';
import ECApi from './ECApi';

import { makeStyles } from '@material-ui/core/styles'
import './App.css';

export const TOKEN_ID = 'usertoken';

let emoArr = (async () => {
   await ECApi.getEmotions(100);
})()

console.log(emoArr)

// let emoStrForBG = emoArr.reduce((str, el) => `${str} ${el}`, '');

const useStyles = makeStyles({
  // basebg: {
  //   position: 'relative',
  //   backgroundColor: '#E5E5FF',
  //   '&::before': {
  //     content: `${emoStrForBG}`,
  //     position: 'absolute',
  //     color: '#00004C',
  //     fontSize: '3em',
  //     top: 0,
  //     left: 0,
  //     zIndex: -1
  //   }
  // }
});

function App() {

  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_ID);


  //finish the login dance
  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        // let currentUser = await ECA



        
      } catch (e) {
        setCurrentUser(null);
      }
    }
  })

  return (
    <div className={classes.container, classes.basebg}>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
