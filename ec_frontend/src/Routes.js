import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Calendar from './Calendar';
import Entry from './Entry';
import EntryForm from './EntryForm';
import Admin from './Admin';
import Inspiration from './Inspiration';
import Login from './Login';
import Signup from './Signup'
import Profile from './Profile';

function Routes () {
    return (
        <div>

        <Switch>
            <Route exact path='/inspiration'>
                <Inspiration />
            </Route>

            {/* needs to be a private route */}
            <Route exact path='/login'>
                {/* need to set a token here */}
                <Login />
            </Route>
            {/* needs to be a private route */}
            <Route exact path='/signup'>
                {/* need to set a token here */}
                <Signup />
            </Route>

            {/* needs to be a private route */}
            <Route exact path='/profile'>
                <Profile />
            </Route>
            {/* needs to be a private route */}
            <Route exact path='/calendar'>
                <Calendar />
            </Route>
            {/* needs to be a private route */}
            <Route exact path='/entryform'>
                <EntryForm />
            </Route>
            {/* needs to be a private route */}
            <Route exact path='/entry/:entryId'>
                <Entry />
            </Route>
            {/* needs to be a private route */}
            <Route exact path='/admin'>
                <Admin />
            </Route>
            <Route exact path='/'>
                <Home />
            </Route>

        </Switch>
        </div>
    )
}

export default Routes;