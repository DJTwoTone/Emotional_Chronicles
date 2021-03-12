import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DateTime } from 'luxon'

import ECApi from './ECApi';

import UserContext from './UserContext';

function Entry() {

    let { username, date } = useParams();

    console.log('checking the params', username, date)

    const [displayedEntry, setDisplayedEntry] = useState({})

    useEffect(() => {
        async function fetchDiaryEntry() {
            try {
                // let convertedDate = DateTime.fromJSDate(date).toSQLDate();
                let entryData = await ECApi.getEntry(username, date);
                console.log('entryData', entryData)
                setDisplayedEntry(entryData)
            }  catch (err) {
                console.log(err)
            }
        }
        fetchDiaryEntry();
    }, [date, username])




    return (

        <div>
            {JSON.stringify(displayedEntry)}
        </div>



    )


}

export default Entry;