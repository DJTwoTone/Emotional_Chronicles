/**
 * This is the basic home page.
 * 
 * Notice that being logged in or logged out will create slight differences.
 * 
 */

 import React, { useContext } from 'react';
 import { Link } from 'react-router-dom';
 
 
 import Container from 'react-bootstrap/Container';
 import Button from 'react-bootstrap/Button';
 
 import Image from 'react-bootstrap/Image'
 
 import diaryhero from'./img/diaryhero.png'
 
 import UserContext from './UserContext';
 
 
 function Home () {
 
     const { loggedInUser } = useContext(UserContext);
 
     function loggedOut() {
         
         
         return (
             <Container fluid className='justify-content-around m-2'>
                 <Link to='/login'>
                 <Button className='m-4' variant='dark'>LOGIN</Button>
                 </Link>
                 <Link to='/signup'>
                 <Button className='m-4' variant='dark'>SIGNUP</Button>
                 </Link>
             </Container>
             ) 
     }
 
     function loggedIn() {
 
         return (
             <Container fluid className='justify-content-center m-2'>
                 <Link to='/today'>
                 <Button className='m-4' variant='dark'>TODAY</Button>
                 </Link>
                 <Link to='/calendar'>
                 <Button className='m-4' variant='dark'>YOUR CALENDAR</Button>
                 </Link>
             </Container>
         )
     }
 
     
     return (
         <div>
         <h1>Welcome to your Emotional Chronicles</h1>
         <Image src={diaryhero} fluid/>
         {loggedInUser ? loggedIn() : loggedOut()}
         
         </div>
             )
 }
 
 export default Home;