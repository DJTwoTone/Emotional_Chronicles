import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import FeelingsCloud from './FeelingsCloud';
import WritingPrompt from './WritingPrompt';
import WritingInspiration from './WritingInspiration'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ECApi from './ECApi';
import UserContext from './UserContext';

function Diary () {

    const history = useHistory()
    const [entry, setEntry] = useState("");
    const [prompt, setPrompt] = useState({});
    const [inspiration, setInspiration] = useState("");

    const { loggedInUser } = useContext(UserContext);

    const [feelings, setFeelings] = useState([]);



    //word cloud
    //set feelings in feelings
    //prompt changing
    //inspitation change
    //change prompt
    //handle change
    //handle submit

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
            console.log('before the api help call', username, data)
            let entry = await ECApi.addEntry(username, data);
            console.log('returned entry', entry);

        } catch (err) {
            console.error(err);
        }
    }

    console.log('in the diary', loggedInUser);


    return (
        <Container className='justify-content-center m-5'>
            <FeelingsCloud className='m-5' feelings={feelings} setFeelings={setFeelings} />
            <WritingPrompt className='m-5' prompt={prompt} setPrompt={setPrompt} />
            <Form className='m-4' onSubmit={handleSubmit}>
                <Form.Group controlId='diaryEntry'>
                    <Form.Control 
                          as='textarea'
                          type='text'
                          name='diaryEntry'
                          value={entry}
                          onChange={handleChange}
                          rows={20}
                    />

                </Form.Group>
                <Button
                    variant='primary'
                    type='submit'
                    onClick={handleSubmit}
                >
                    RECORD
                </Button>
            </Form>
            <WritingInspiration 
                className='m5' 
                inspiration={inspiration}
                 setInspiration={setInspiration} />
        </Container>

    )




}


export default Diary;