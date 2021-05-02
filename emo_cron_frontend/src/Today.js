/**
 * This is a helper component to redirect users if they have alreadyt made a diary entry today.
 * 
 * This might become unneeded to the future depending on certain design decisions.
 */


 import React, { useContext } from 'react';

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