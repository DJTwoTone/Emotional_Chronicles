//https://openbase.com/js/react-calendar


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function EmoCalendar () {


    //can i change this to [date, setDate] ?
    const [calDate, setCalDate] = useState(new Date())

    function showEntry(value, event) {
        console.log(typeof(value), value.getDate());
        //
    }
    console.log(calDate.getMonth())

    //make a useEffect to redirect to a day

    //the css needs to be adjusted to be bigger

    return (
        <div>
        <Calendar
            onChange={setCalDate}
            value={calDate}
            onClickDay={showEntry}
        />
        {/* <p>{{calDate}}</p> */}
        </div>
            )
}

export default EmoCalendar;