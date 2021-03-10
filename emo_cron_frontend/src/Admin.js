import React, { useState, useEffect } from 'react';
import ECApi from './ECApi';


function Admin () {

    const [flaggedInspiration, setFlaggedInspiration] = useState({})

    async function getFlaggedInspiration() {
        const flagged = await ECApi.getFlaggedInspiration();
        console.log('flagged inspiration', flagged)
        setFlaggedInspiration(flagged)
    }
    
    useEffect(() => {
        getFlaggedInspiration()
    }, [])


    return (
        <div>
            <p>{JSON.stringify(flaggedInspiration)}</p>
        </div>
        )
}

export default Admin;