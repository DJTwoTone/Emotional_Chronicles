// import logo from './logo.svg';
import React from 'react';
import Header from './Header';
import Routes from './Routes';

import { makeStyles } from '@material-ui/core/styles'

import './App.css';

const useStyles = makeStyles({});

function App() {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
