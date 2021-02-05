//https://openbase.com/js/react-calendar


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function EmoCalendar () {

    const [value, onChange] = useState(new Date())

    function showEntry(value, event) {
        console.log(typeof(value), value.getDate());
    }

    return (
        <div>
        <Calendar
            onChange={onChange}
            value={value}
            onClickDay={showEntry}
        />    
        </div>
            )
}

export default EmoCalendar;