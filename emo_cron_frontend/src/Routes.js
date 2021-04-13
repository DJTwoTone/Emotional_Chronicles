import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Inspiration from './Inspiration';
import HowItWorks from './HowItWorks';
import Today from './Today';
import EmoCalendar from './EmoCalendar';
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin';
import Entry from './Entry';
import FullDiary from './FullDiary';
import PrivateRoute from'./PrivateRoutes';


function Routes ({ setToken }) {
    
    
//needs a default route

    return (
        <div>
            <Switch>

                <Route exact path='/'>
                    <Home />
                </Route>

                <Route exact path='/inspiration'>
                    <Inspiration />
                </Route>

                <Route exact path='/howitworks'>
                    <HowItWorks />
                </Route>

                <Route exact path='/login'>
                    <Login setToken={setToken}/>
                </Route>

                <Route exact path='/signup'>
                    <Signup setToken={setToken} />
                </Route>


                <PrivateRoute exact path='/today'>
                    <Today />
                </PrivateRoute>

                <PrivateRoute exact path='/calendar'>
                    <EmoCalendar />
                </PrivateRoute>

                <PrivateRoute exact path='/entry/:username/:date'>
                    <Entry  />
                </PrivateRoute>

                <PrivateRoute exact path='/fulldiary/:username'>
                    <FullDiary />
                </PrivateRoute>


                <PrivateRoute exact path='/admin'>
                    <Admin />
                </PrivateRoute>

            

            </Switch>


        </div>




    )
}

export default Routes;