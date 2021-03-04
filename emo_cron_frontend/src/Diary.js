import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FeelingsCloud from './FeelingsCloud';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Diary () {

    const history = useHistory()
    const [entry, setEntry] = useState("");

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


    return (
        <Container className='justify-content-center m-5'>
            <FeelingsCloud className='m-5' feelings={feelings} setFeelings={setFeelings} />
            <Form className='m-5'>
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
        </Container>

    )




}


export default Diary;