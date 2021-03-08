import React, { useContext } from 'react';

// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

import Calendar from 'react-calendar';

import Container from 'react-bootstrap/Container';

import MonthGraph from './MonthGraph';
import UserContext from './UserContext';

function EmoCalendar () {

    const { loggedInUser } = useContext(UserContext);
    //this need deigned
    //possibly an emotion cloud as the background
    
    console.log('in the calendar', loggedInUser)

    return (
        <Container className='m-4'>
        <Calendar />
        <MonthGraph />
        </Container>
            )
}

export default EmoCalendar;