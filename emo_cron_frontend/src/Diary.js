import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import FeelingsCloud from './FeelingsCloud';
import WritingPrompt from './WritingPrompt';
import WritingInspiration from './WritingInspiration'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserContext from './UserContext';

function Diary () {

    const history = useHistory()
    const [entry, setEntry] = useState("");
    const [prompt, setPrompt] = useState({});
    const [inspiration, setInspiration] = useState("");

    const { loggedInUser } = useContext(UserContext);

    const [feelings, setFeelings] = useState([]);
    // const [prompt, setPrompt] = useState('');
    // const [inspiration, setInspiration] = ('');


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
        console.log('entry:', entry, 'feelings:', feelings)
    }

    console.log('in the diary', loggedInUser);


    return (
        <Container className='justify-content-center m-5'>
            <FeelingsCloud className='m-5' feelings={feelings} setFeelings={setFeelings} />
            <WritingPrompt className='m-5' prompt={prompt} setPrompt={setPrompt} />
            <Form className='m-4'>
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
            </Form>
            <WritingInspiration 
                className='m5' 
                inspiration={inspiration}
                 setInspiration={setInspiration} />
        </Container>

    )




}


export default Diary;