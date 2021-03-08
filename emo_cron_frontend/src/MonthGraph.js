import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer} from 'recharts';
import { DateTime } from 'luxon'

import formatAnalysedMonth from './hooks/formatAnalysedMonth'; 

import UserContext from './UserContext';


function MonthGraph() {

    const { loggedInUser } = useContext(UserContext);
    const [formattedData, setFormattedData] = useState([])

    // console.log(loggedInUser)
    
    console.log('loggedinuser in the monthgraph', loggedInUser)

    useEffect(() => {
        async function fetchData() {
            const data = await formatAnalysedMonth(loggedInUser.username, DateTime.now());
            console.log(data)
        }
        fetchData();
    })

    

    


    return (

        <p>Month graph</p>
        // <ResponsiveContainer width="100%" height="100%">


        //     {/* <LineChart */}
        //     {/* <p>{data}</p> */}
        // </ResponsiveContainer>
    )
}

export default MonthGraph;