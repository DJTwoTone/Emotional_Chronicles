/**
 * This component uses react-calendar to display a calendar of the users diary entries.
 * Days that have an entry should display the dominant ermotion for that day. Days that do not have an entry should be disabled.
 * Clicking on a day, should link to that days diary entry.
 * 
 * In addition, users can see a graph displaying there emotions over the month as well as get access to a list of all their diary entries
 */


 import React, { useContext, useEffect, useState } from 'react';
 import { DateTime } from 'luxon'
 
 import MonthFormatter from './hooks/formatAnalysedMonth'; 
 
 import './Calendar.css';
 
 import Calendar from 'react-calendar';
 
 import Container from 'react-bootstrap/Container';
 import Button from 'react-bootstrap/Button';
 
 import MonthGraph from './MonthGraph';
 import UserContext from './UserContext';
 import { useHistory } from 'react-router';
 import { Link } from 'react-router-dom';
 
 function EmoCalendar () {
 
     const { loggedInUser } = useContext(UserContext);
 
     const history = useHistory();
 
     const [calDate, setCalDate] = useState(new Date());
     const [firstOfTheMonth, setFirstOfTheMonth] = useState(calDate);
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
         let username = loggedInUser.username;
         history.push(`/entry/${username}/${date}`)
     }
 
     useEffect(() => {
         async function fetchDisabled() {
             try {
                 let disabledDays = await MonthFormatter.formatMonthDisabledDates(loggedInUser.username, DateTime.fromJSDate(firstOfTheMonth))
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
         <Container className='justify-content-center my-5'>
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
         
         <Link to={`/fulldiary/${loggedInUser.username}`}>
         <Button variant='dark' size='lg' block>
             Show Me All My Diary Entries
         </Button>
         </Link>
         </Container>
             )
 }
 
 export default EmoCalendar;