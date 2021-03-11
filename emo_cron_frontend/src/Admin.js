import React, { useState, useEffect } from 'react';
import ECApi from './ECApi';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


function Admin () {

    const [flaggedInspiration, setFlaggedInspiration] = useState({})
    const [message, setMessage] = useState('');

    async function getFlaggedInspiration() {
        const returnedFlagged = await ECApi.getFlaggedInspiration();
        console.log('flagged inspiration', returnedFlagged)
        setFlaggedInspiration(returnedFlagged)
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

    


    return (
        <Container fluid className=' justify-content-center m-2'> 
            <h2>{flaggedInspiration.message}</h2>
            <p>{message}</p>
            
            <ListGroup>
            
            {flaggedInspiration.flagged.map(inspire => (
            <ListGroup.Item
                key={inspire.id}
                name={inspire.id}
            >
                {inspire.inspiration}
                <Button variant='success' name={inspire.id} onClick={handleApprove}>Approve</Button>
                <Button variant='warning' name={inspire.id} onClick={handleDelete}>Delete</Button>
    
            </ListGroup.Item>
        ))}

        </ListGroup>

        </Container>
        )
}

export default Admin;