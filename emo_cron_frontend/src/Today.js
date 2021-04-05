import React, { useContext } from 'react';
// import Calendar from 'react-calendar';
import EmoCalendar from './EmoCalendar'

import Diary from './Diary';

import UserContext from './UserContext'

function Today () {

    let { todaysEntry } = useContext(UserContext);

    if (todaysEntry) {
        //put a merssage in here
        
        return (
            <EmoCalendar />
        )
    }
    
    return (
        <Diary />
    )
}

export default Today;