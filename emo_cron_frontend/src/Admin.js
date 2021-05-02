/**
 * The functionality of the Admin page is only for inspriational quotes at the moment, but it could be expanded to include prompts and emotions
 * In addition, it could also do some work with adding prompts, quotes, and emotions, and editing/helping users
 */

 import React, { useState, useEffect } from 'react';
 import ECApi from './ECApi';
 
 import Container from 'react-bootstrap/Container';
 import ListGroup from 'react-bootstrap/ListGroup';
 import Button from 'react-bootstrap/Button';
 
 import Loader from './Loader'
 
 
 function Admin () {
 
     const [flaggedInspiration, setFlaggedInspiration] = useState([])
     const [inspirationMessage, setInspirationMessage] = useState('')
     const [message, setMessage] = useState('');
     const [loading, setLoading] = useState(false);
 
     async function getFlaggedInspiration() {
         setLoading(true)
         const returnedFlagged = await ECApi.getFlaggedInspiration();
         setLoading(false)
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
 
         const res = await ECApi.approveFlaggedInspiration(+evt.target.name)
         getFlaggedInspiration();
         setMessage(res.message)
 
 
     }
     
     async function handleDelete(evt) {
 
         const res = await ECApi.deleteFlaggedInspiration(+evt.target.name);
         getFlaggedInspiration();
         setMessage(res.message)
     }
 
     //add inspiration and prompt forms
 
 
     return (
         <Container fluid className=' justify-content-center m-2'> 
             <h2>{inspirationMessage}</h2>
             <p>{message}</p>
 
             {loading 
             ? <Loader />
             : null
             }
             
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