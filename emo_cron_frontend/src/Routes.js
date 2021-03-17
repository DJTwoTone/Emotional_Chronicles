import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Inspiration from './Inspiration';
import Today from './Today';
import EmoCalendar from './EmoCalendar';
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin';
import Entry from './Entry';
import PrivateRoute from'./PrivateRoutes';


function Routes ({ setToken }) {
    
    
    return (
        <div>
            <Switch>

                <Route exact path='/'>
                    <Home />
                </Route>

                <Route exact path='/inspiration'>
                    <Inspiration />
                </Route>

                <Route exact path='/login'>
                    <Login setToken={setToken}/>
                </Route>

                <Route exact path='/signup'>
                    <Signup setToken={setToken} />
                </Route>

                {/* these need to be made private */}

                <PrivateRoute exact path='/today'>
                    <Today />
                </PrivateRoute>

                <PrivateRoute exact path='/calendar'>
                    <EmoCalendar />
                </PrivateRoute>

                <PrivateRoute exact path='/entry/:username/:date'>
                    <Entry  />
                </PrivateRoute>

                {/* think about adding a profile route */}

                {/* add admin route */}

                <PrivateRoute exact path='/admin'>
                    <Admin />
                </PrivateRoute>


            </Switch>


        </div>




    )
}

export default Routes;