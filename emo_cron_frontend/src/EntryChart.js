/**
 * This component creates a polar graph to display a users emotions on a particular day
 * 
 * May other intesting things could be done with the styling.
 * 
 */


 import React from 'react';
 import {RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer} from 'recharts';
 
 function EntryChart({data}) {
 
     let formattedData = [
         {
             'emotion': 'joy',
             'score': Math.round((data.joy || 0) * 100)
         },
         {
             'emotion': 'sadness',
             'score': Math.round((data.sadness || 0) * 100)
         },
         {
             'emotion': 'fear',
             'score': Math.round((data.fear || 0) * 100)
         },
         {
             'emotion': 'anger',
             'score': Math.round((data.anger || 0) * 100)
         },
         {
             'emotion': 'anticipation',
             'score': Math.round((data.anticipation || 0) * 100)
         },
         {
             'emotion': 'disgust',
             'score': Math.round((data.disgust || 0) * 100)
         },
         {
             'emotion': 'trust',
             'score': Math.round((data.trust || 0) * 100)
         },
         {
             'emotion': 'emotionlessness',
             'score': Math.round((data.no_emotion || 0) * 100)
         }
     ]
 
     return (
         <div>
             <p>Emotional Radar</p>
             <ResponsiveContainer width='75%' height={300}>
                 <RadarChart outerRadius={100} width={730} height={250} data={formattedData}>
                     <PolarGrid />
                     <PolarAngleAxis dataKey="emotion" />
                     <PolarRadiusAxis angle={30} domain={[0, 100]} />
                     <Radar dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                 </RadarChart>
 
             </ResponsiveContainer>
         </div>
 
     )
 
 
 }
 
 
 export default EntryChart;