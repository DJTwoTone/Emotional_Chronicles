import React, { useContext } from 'react';

import UserContext from './UserContext';

import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

function Navigation({ logout }) {

    const { loggedInUser } = useContext(UserContext);

    //Needs a how it works

    function loggedOutNav() {


        return (
            
            <Nav className='ml-auto'>
                <LinkContainer to="/inspiration">
                    
                        <Nav.Link >Get Some Inspiration</Nav.Link>
                    
                </LinkContainer>
                <LinkContainer to="/login">
                    
                        <Nav.Link>Login</Nav.Link>
                    
                </LinkContainer>
            <LinkContainer to="/signup">
                
                    <Nav.Link>Signup</Nav.Link>
                
                </LinkContainer>
        </Nav>

        )
    }

    function loggedInNav() {

        // console.log('in the navigation logged in', loggedInUser)
        return (
            <Nav className='ml-auto'>
                <LinkContainer to="/inspiration">
                    
                        <Nav.Link>Get Some Inspiration</Nav.Link>
                    
                </LinkContainer>
                <LinkContainer to="/today">
                    
                        <Nav.Link >Today</Nav.Link>
                    
                </LinkContainer>
                <LinkContainer to="/calendar">
                    
                        <Nav.Link>Calendar</Nav.Link>
                    
                </LinkContainer>
            {/* think about adding a profile option here */}
            {/* need a link ot the admin page if user is admin */}
            {loggedInUser.is_admin 
            ?   <LinkContainer to="/admin">
                    
                        <Nav.Link>Admin</Nav.Link>
                    
                </LinkContainer>
            : null}
                <LinkContainer to="/">
                    
                        <Nav.Link onSelect={logout}>Logout</Nav.Link>
                    
                </LinkContainer>
        </Nav>

        )
    }

    return (
        <NavBar bg='dark' variant='dark'>
            <LinkContainer to='/'>
                <NavBar.Brand>EMOTIONAL CHRONICLES</NavBar.Brand>
            </LinkContainer>
            {loggedInUser ? loggedInNav() : loggedOutNav()}
        </NavBar>

        )



}

export default Navigation;