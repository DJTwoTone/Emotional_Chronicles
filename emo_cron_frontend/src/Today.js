import React, { useContext } from 'react';

import Diary from './Diary';

import UserContext from './UserContext'

function Today () {

    let { todaysEntry } = useContext(UserContext);

    if (todaysEntry) {
        
    }
    
    return (
        <Diary />
    )
}

export default Today;