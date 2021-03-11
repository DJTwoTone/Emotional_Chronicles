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


function Routes ({setToken}) {
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

                <Route exact path='/today'>
                    <Today />
                </Route>

                <Route exact path='/calendar'>
                    <EmoCalendar />
                </Route>

                <Route exact path='/entry/:username/:date'>
                    <Entry  />
                </Route>

                {/* think about adding a profile route */}

                {/* add admin route */}

                <Route exact path='/admin'>
                    <Admin />
                </Route>


            </Switch>


        </div>




    )
}

export default Routes;