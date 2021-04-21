import React, { useState } from 'react';

import ECApi from './ECApi';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function WritingInspiration({ inspiration, getInspiration }) {

    const [insp, setInsp] = useState('')
    const [inspMessage, setInspMessage] = useState('')


    function handleChange(evt) {
        setInsp(evt.target.value);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            inspiration: insp
        }
        try {
            let res = await ECApi.addInspiration(data)
            setInspMessage(`Thank you for sharing. "${res}"`)
            setInsp('');
        } catch (err) {
            setInspMessage(err);
        }
    }

    return (

        <Card className='m-4 shadow'>
            <Card.Body>
                <Card.Header>Something to inspire you...</Card.Header>
                <Card.Text className='display-4'>{inspiration.inspiration}</Card.Text>
                <Button className='mb-4' variant='dark' onClick={getInspiration}>GET MORE INSPIRATION</Button>
                <Card.Footer>
                    <Card.Text>Share some inspiration...</Card.Text>
                    <Form inline onSubmit={handleSubmit}>
                        <Form.Control 
                            className='col-10'
                            type='text'
                            name='inspText'
                            value={insp}
                            onChange={handleChange}
                        />
                        <Button className='ml-2' variant='dark' type='submit'>SHARE</Button>
                    </Form>
                    {inspMessage 
                    ? <Card.Text>{inspMessage}</Card.Text>
                    : null
                    }
                </Card.Footer>
            </Card.Body>


        </Card>



    )


}

export default WritingInspiration;