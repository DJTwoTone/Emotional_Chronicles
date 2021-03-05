import React from 'react';
import Calendar from 'react-calendar';

// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

import Container from 'react-bootstrap/Container'


function EmoCalendar () {


    //this need deigned
    //possibly an emotion cloud as the background
    
    return (
        <Container className='m-4'>
        <Calendar />
        </Container>
            )
}

export default EmoCalendar;