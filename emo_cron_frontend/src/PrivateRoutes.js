import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';

function PrivateRoute({exact, path, children}) {

    const { loggedInUser } = useContext(UserContext);

    // console.log('in the private route',  useContext(UserContext))

    if(!loggedInUser) {
        return <Redirect to='/' />;
    }

    return (
        
        <Route exact={exact} path={path}>
            {children}
        </Route>
        
        )
}

export default PrivateRoute;