/**
 * This is the component showing users their emotions over a month.
 * 
 * So much that I played with. So, much that can still be played with.
 * 
 */


 import React, { useContext, useEffect, useState } from 'react';
 import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
 
 
 import MonthFormatter from './hooks/formatAnalysedMonth'; 
 
 import UserContext from './UserContext';
 
 
 function MonthGraph({ date }) {
 
     const { loggedInUser } = useContext(UserContext);
     const [formattedData, setFormattedData] = useState([])
     
 
     useEffect(() => {
         async function fetchData() {
             
             try {
                 let data = await MonthFormatter.formatMonthEmotions(loggedInUser.username, date);
 
                 setFormattedData(data);
 
             } catch (err) {
                 console.error(err);
             }
             
         }
 
         fetchData();
     }, [loggedInUser, date])
 
     
 
     
 
 
     return (
         <div>
             <p>Month graph</p>
             <ResponsiveContainer width="100%" height={400}>
                 <div>
 
                     <LineChart
                         width={500}
                         height={250}
                         type='natural'
                         data={formattedData}
                         margin={{
                             top: 5,
                             right: 30,
                             left: 20,
                             bottom: 5
                         }}
                     >
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey='date' />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Line type='monotone' dataKey='disgust' stroke='#DF4ADF' />
                         <Line type='monotone' dataKey='fear' stroke='#008108'/>
                         <Line type='monotone' dataKey='joy' stroke='#FFE953'/>
                         <Line type='monotone' dataKey='sadness' stroke='#5050FF'/>
                         <Line type='monotone' dataKey='surprise' stroke='#018AE1'/>
                         <Line type='monotone' dataKey='trust' stroke='#00B510'/>
 
                     </LineChart>
                 </div>
             </ResponsiveContainer>
 
         </div>
     )
 }
 
 export default MonthGraph;