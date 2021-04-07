import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon'

import FeelingsCloud from './FeelingsCloud';
import WritingPrompt from './WritingPrompt';
import WritingInspiration from './WritingInspiration'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ECApi from './ECApi';
import UserContext from './UserContext';

import './Diary.css';

function Diary () {

    const history = useHistory()
    const [entry, setEntry] = useState("");
    const [prompt, setPrompt] = useState({});
    const [inspiration, setInspiration] = useState("");

    const { loggedInUser, todaysEntry, setTodaysEntry } = useContext(UserContext);

    const [feelings, setFeelings] = useState([]);



    //change feelings button
    //todaysentry - set todaysentry
    //if todays entry => redirect to today

    function handleChange(evt) {
        setEntry(evt.target.value);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        let data = {
            diaryentry: entry,
            emotions: feelings,
            'prompt_id': prompt.id,
            'inspiration_id': inspiration.id

        }
        const username = loggedInUser.username

        try {
            
            let entry = await ECApi.addEntry(username, data);
            let entryDate = DateTime.fromISO(entry.entry.date).toISODate()

            setTodaysEntry(true);
            history.push(`/entry/${username}/${entryDate}`)
            

        } catch (err) {
            console.error(err);
        }
    }

    if (todaysEntry) {
        history.push('/calendar')
    }


    return (

        <Container fluid className='justify-content-center my-5'>
        <FeelingsCloud className='m-4' feelings={feelings} setFeelings={setFeelings} />
        <WritingPrompt prompt={prompt} setPrompt={setPrompt} />
        <Form className='m-4 shadow' onSubmit={handleSubmit}>
            <Form.Group controlId='diaryEntry'>
                <div  id='pattern'>
                <Form.Control 
                      as='textarea'
                      type='text'
                      name='diaryEntry'
                      value={entry}
                      onChange={handleChange}
                      rows={20}
                />

                </div>

            </Form.Group>
            
            <Button
                className='mb-4'
                variant='dark'
                type='submit'
                onClick={handleSubmit}
            >
                RECORD
            </Button>
        </Form>
        <WritingInspiration 
            className='m-4 shadow' 
            inspiration={inspiration}
             setInspiration={setInspiration} />
    </Container>
        
    )




}


export default Diary;