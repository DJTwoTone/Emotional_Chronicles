import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Inspiration from './Inspiration';
import Today from './Today';
import Calendar from './Calendar';
import Login from './Login';
import Signup from './Signup';


function Routes () {
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
                    <Login />
                </Route>

                <Route exact path='/signup'>
                    <Signup />
                </Route>

                {/* these need to be made private */}

                <Route exact path='/today'>
                    <Today />
                </Route>

                <Route exact path='/calendar'>
                    <Calendar />
                </Route>

                {/* think about adding a profile route */}

                {/* add admin route */}


            </Switch>


        </div>




    )
}

export default Routes;