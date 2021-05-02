/**
 * This component displays all the gathered information for a give diary entry. 
 * 
 * This is where the emotional math is used
 */


 import React, { useContext, useEffect, useState } from 'react';
 import { useParams } from 'react-router';
 import { Link } from 'react-router-dom';
 import { DateTime } from 'luxon'
 
 import ECApi from './ECApi';
 import emotionalMath from './hooks/emotionalMath';
 
 import EntryChart from './EntryChart';
 import Loader from './Loader'
 
 import UserContext from './UserContext';
 
 import Container from 'react-bootstrap/Container';
 import Card from 'react-bootstrap/Card';
 import ListGroup from 'react-bootstrap/ListGroup';
 import Button from 'react-bootstrap/Button';
 
 function Entry() {
 
     let { date } = useParams();
 
     let { loggedInUser } = useContext(UserContext);
 
     const username = loggedInUser.username;
  
 
     const [displayedEntry, setDisplayedEntry] = useState({})
     const [entryEmotions, setEntryEmotions] = useState([]);
     const [loading, setLoading] = useState(false);
 
     useEffect(() => {
         async function fetchDiaryEntry() {
             try {
                 setLoading(true)
                 let entryData = await ECApi.getEntry(username, date);
                 setLoading(false)
                 setDisplayedEntry(entryData)
             }  catch (err) {
                 console.error(err)
             }
         }
         fetchDiaryEntry();
     }, [date, username])
     
     useEffect(() => {
         setEntryEmotions(emotionalMath(displayedEntry))
 
         
     }, [displayedEntry])
 
 
     return (
 
         <Container className='justify-content-center m-5'>
 
             {loading 
             ? <Loader />
             : null
             }
 
             <Card>
                 <Card.Header>
                 {DateTime.fromISO(displayedEntry.date).toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })}
                 </Card.Header>
                 <Card.Body>
                     <Card.Text>You wrote:</Card.Text>
                     <Card.Text>{displayedEntry.entry}</Card.Text>
                     <Card.Text>Your writing prompt was:</Card.Text>
                     <Card.Text>{displayedEntry.propmt}</Card.Text>
                     <Card.Text>You may have been inspired by:</Card.Text>
                     <Card.Text>{displayedEntry.inspiration}</Card.Text>
                     <div className='row g-1 justify-content-around'>
                         <div className='col-5'>
                             <Card.Text>You said you were feeling:</Card.Text>
                             {displayedEntry.emotions
                             ? <ListGroup>
                                 {displayedEntry.emotions.map(emo => (
                                     <ListGroup.Item
                                         key={emo.emotion}
                                     >
                                         {emo.emotion}
                                     </ListGroup.Item>
                                 ))}
                             </ListGroup>
                             : <Card.Text>You didn't share this with us</Card.Text>}
                         </div>
                         <div className='col-5'>
                             <Card.Text>Our analysis shows you might be feeling:</Card.Text>
                             {entryEmotions
                             ? <ListGroup>
                                 {entryEmotions.map(emo => (
                                     <ListGroup.Item
                                         key={emo}
                                     >
                                         {emo}
                                     </ListGroup.Item>
                                 ))}
                             </ListGroup>
                             : <Card.Text>Inconclusive</Card.Text>}
                         </div>
                         
                     </div>
                     <EntryChart data={displayedEntry} />
                 </Card.Body>
             </Card>
             <div className='row g-1 justify-content-around m-3'>
                 <Link to={`/fulldiary/${loggedInUser.username}`}>
                     <Button variant='dark' size='lg' block>
                         All Entries
                     </Button>
                 </Link>
                 <Link to={'/calendar'}>
                     <Button variant='dark' size='lg' block>
                         Calendar
                     </Button>
                 </Link>
             </div>
          </Container>
 
 
 
     )
 
 
 }
 
 export default Entry;