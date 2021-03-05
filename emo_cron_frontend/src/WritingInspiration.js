import React, { useEffect, useState } from 'react';

import ECApi from './ECApi';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function WritingInspiration({ inspiration, setInspiration }) {

    const [insp, setInsp] = useState('')
    const [inspMessage, setInspMessage] = useState('')

    async function getInspiration() {
        const gottenInspiration = await ECApi.getInspiration();
        setInspiration(gottenInspiration[0])
    }

    useEffect(() => {
        getInspiration();
    }, [])

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

        <Card className='m-4'>
            <Card.Body>
                <Card.Header>Something to inspire you...</Card.Header>
                <Card.Text className='display-4'>{inspiration.inspiration}</Card.Text>
                <Button className='mb-4' variant='primary' onClick={getInspiration}>GET MORE INSPIRATION</Button>
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
                        <Button className='ml-2' variant='secondary' type='submit'>SHARE</Button>
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