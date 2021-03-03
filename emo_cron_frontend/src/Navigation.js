import React, { useContext } from 'react';

import UserContext from './UserContext';

import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation({ logout }) {

    const { loggedInUser } = useContext(UserContext);

    function loggedOutNav() {
        return (
            
            <Nav className='ml-auto'>
            <Nav.Item>
                <Nav.Link href="/inspiration">Get Some Inspiration</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav.Item>
        </Nav>

        )
    }

    function loggedInNav() {
        return (
            <Nav className='ml-auto'>
            <Nav.Item>
                <Nav.Link href="/inspiration">Get Some Inspiration</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/today">Today</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/signup">Calendar</Nav.Link>
            </Nav.Item>
            {/* think about adding a profile option here */}
            {/* need a link ot the admin page if user is admin */}
            <Nav.Item>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav.Item>
        </Nav>

        )
    }

    return (
        <NavBar bg='primary' variant='dark'>
            <NavBar.Brand href='/' >EMOTIONAL CHRONICLES</NavBar.Brand>
            {loggedInUser ? loggedInNav() : loggedOutNav()}
        </NavBar>

        )



}

export default Navigation;