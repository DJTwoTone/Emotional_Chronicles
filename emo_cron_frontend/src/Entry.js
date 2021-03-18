import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DateTime } from 'luxon'

import ECApi from './ECApi';
import emotionalMath from './hooks/emotionalMath';

import EntryChart from './EntryChart'

import UserContext from './UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Entry() {

    let { username, date } = useParams();


    const [displayedEntry, setDisplayedEntry] = useState({})
    const [entryEmotions, setEntryEmotions] = useState({});

    useEffect(() => {
        async function fetchDiaryEntry() {
            try {
                // let convertedDate = DateTime.fromJSDate(date).toSQLDate();
                let entryData = await ECApi.getEntry(username, date);
                console.log('entryData', entryData)
                setDisplayedEntry(entryData)
            }  catch (err) {
                console.log(err)
            }
        }
        fetchDiaryEntry();
    }, [date, username])
    
    useEffect(() => {
        setEntryEmotions(emotionalMath(displayedEntry))
        
    }, [displayedEntry])


    




    return (

        <Container className='justify-content-center m-5'>
            {JSON.stringify(displayedEntry)}
            {JSON.stringify(entryEmotions)}

            <Card>
                <Card.Header>
                {displayedEntry.date}
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
            
            {/* <p>On {displayedEntry.date}, you wrote:</p>
            <p>{displayedEntry.entry}</p>
            <p>On the topic:{displayedEntry.prompt} </p>
            {/* <p>You said you felt:{displayedEntry.emotions}</p> */}
            {/* <p>Our analysis says you might be feeling:{entryEmotions}</p> */}
            {/* <p>you might have been inspired by:{displayedEntry.inspiration}</p> */} 
            
         </Container>








        // <div>
        //     {JSON.stringify(displayedEntry)}
        //     {JSON.stringify(entryEmotions)}
            
        //     <EntryChart data={displayedEntry} />
        // </div>



    )


}

export default Entry;