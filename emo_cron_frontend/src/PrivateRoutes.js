/**
 * Just a simple comonment to protect routes from people who aren't logged in.
 * 
 */

 import React, { useContext } from 'react'
 import { Route, Redirect } from 'react-router-dom';
 import UserContext from './UserContext';
 
 function PrivateRoute({exact, path, children}) {
 
     const { loggedInUser } = useContext(UserContext);
 
 
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