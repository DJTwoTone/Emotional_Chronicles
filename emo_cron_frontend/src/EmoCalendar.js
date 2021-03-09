import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon'

// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

import Calendar from 'react-calendar';

import Container from 'react-bootstrap/Container';

import MonthGraph from './MonthGraph';
import UserContext from './UserContext';

function EmoCalendar () {

    const { loggedInUser } = useContext(UserContext);

    const [calDate, setCalDate] = useState(new Date());
    const [firstOfTheMonth, setFirstOfTheMonth] =useState(calDate)

    function onChange(value, evt) {
        console.log('nextvalue', value, evt)
        setCalDate(value);
    }

    function onActiveStartDateChange({activeStartDate}) {
        
        setFirstOfTheMonth(activeStartDate)
    }
    //this need deigned
    //possibly an emotion cloud as the background
    
    console.log('calDAte', calDate, typeof(calDate))

    //use onDayClick (value, event) to go to diary entry
    //tileContent

    return (
        <Container className='m-4'>
        <Calendar 
            onChange={onChange}
            onActiveStartDateChange={onActiveStartDateChange}
            value={calDate}
            maxDetail='month'
            minDetail='month'

        />
        <MonthGraph date={DateTime.fromJSDate(firstOfTheMonth)}/>
        </Container>
            )
}

export default EmoCalendar;