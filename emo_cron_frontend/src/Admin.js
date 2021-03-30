import React, { useState, useEffect } from 'react';
import ECApi from './ECApi';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


function Admin () {

    const [flaggedInspiration, setFlaggedInspiration] = useState([])
    const [inspirationMessage, setInspirationMessage] = useState('')
    const [message, setMessage] = useState('');

    async function getFlaggedInspiration() {
        const returnedFlagged = await ECApi.getFlaggedInspiration();
        console.log('flagged inspiration', returnedFlagged)
        setFlaggedInspiration(returnedFlagged.flagged)
        setInspirationMessage(returnedFlagged.message)
    }
    
    useEffect(() => {
        async function doIt() {
            await getFlaggedInspiration()

        }
        doIt();
    }, [])

    async function handleApprove(evt) {
        console.log('in handle approve', evt.target.name);
        const res = await ECApi.approveFlaggedInspiration(+evt.target.name)
        getFlaggedInspiration();
        setMessage(res.message)


    }
    
    async function handleDelete(evt) {
        
        console.log('in handle delete', evt.target.name);

        const res = await ECApi.deleteFlaggedInspiration(+evt.target.name);
        getFlaggedInspiration();
        setMessage(res.message)
    }

    //add inspiration and prompt forms


    return (
        <Container fluid className=' justify-content-center m-2'> 
            <h2>{inspirationMessage}</h2>
            <p>{message}</p>
            
        {flaggedInspiration 
        
            ?<ListGroup>
            
            {flaggedInspiration.map(inspire => (
            <ListGroup.Item
                key={inspire.id}
                name={inspire.id}
                className='m-4 shadow border border-dark border-3 rounded'
            >
                {inspire.inspiration}
                <Button variant='success' className='mx-3' name={inspire.id} onClick={handleApprove}>Approve</Button>
                <Button variant='warning'  name={inspire.id} onClick={handleDelete}>Delete</Button>
    
            </ListGroup.Item>
        ))}

        </ListGroup>
            : null
        }


        </Container>
        )
}

export default Admin;