import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon'

import MonthFormatter from './hooks/formatAnalysedMonth'; 

// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

import Calendar from 'react-calendar';

import Container from 'react-bootstrap/Container';

import MonthGraph from './MonthGraph';
import UserContext from './UserContext';
import { useHistory } from 'react-router';

function EmoCalendar () {

    const { loggedInUser } = useContext(UserContext);

    const history = useHistory();

    const [calDate, setCalDate] = useState(new Date());
    const [firstOfTheMonth, setFirstOfTheMonth] = useState(calDate);
    const [clickedDay, setClickedDay] = useState('')
    const [dateInMonth, setDatesInMonth] = useState()
    const [disabledDates, setDisabledDates] = useState([]);
    const [dateClasses, setDateClasses] = useState([]);


    function onChange(value) {
        setCalDate(value);
    }

    function onActiveStartDateChange({activeStartDate}) {
        
        setFirstOfTheMonth(activeStartDate)
    }

    

    function onClickDay(value) {

        
        let date = DateTime.fromJSDate(value).toISODate()
        // let date = DateTime.fromJSDate(value).toSQLDate()

        let username = loggedInUser.username;

        history.push(`/entry/${username}/${date}`)

    }

    useEffect(() => {
        async function fetchDisabled() {

            try {

                let disabledDays = await MonthFormatter.formatMonthDisabledDates(loggedInUser.username, DateTime.fromJSDate(firstOfTheMonth))
                // console.log('in the useeefffect', disabledDays)
                setDisabledDates(disabledDays);

            } catch (err) {
                console.error(err)
            }
        }
        fetchDisabled();
    }, [loggedInUser, firstOfTheMonth])

    function tileDisabled({date, view}) {

        if (view === 'month') {
            return disabledDates.find(dDate => DateTime.fromISO(dDate).hasSame(date, 'day'))
        }
    }

    useEffect(() => {
        async function fetchDayClasses() {

            try {
                
                let dayClasses = await MonthFormatter.formatMonthColorClass(loggedInUser.username, DateTime.fromJSDate(firstOfTheMonth))
                setDateClasses(dayClasses)
            } catch (err) {
                console.error(err)
            }

        }
        fetchDayClasses()
    }, [loggedInUser, firstOfTheMonth])



    function tileClassName({date, view}) {

        if (view === 'month') {
            
            if (dateClasses.find(dDate => DateTime.fromISO(dDate.date).hasSame(date, 'day'))) {
                let emotion = dateClasses.find(dDate => DateTime.fromISO(dDate.date).hasSame(date, 'day'))
                return `${emotion.class}-day-background`

            }
        }

    }


    return (
        <Container className='justify-content-center m-5'>
        <Calendar 
            onChange={onChange}
            onActiveStartDateChange={onActiveStartDateChange}
            onClickDay={onClickDay}
            value={calDate}
            tileDisabled={tileDisabled}
            maxDetail='month'
            minDetail='month'
            calendarType='US'
            showNeighboringMonth={false}
            tileClassName={tileClassName}

        />
        <MonthGraph date={DateTime.fromJSDate(firstOfTheMonth)}/>
        </Container>
            )
}

export default EmoCalendar;