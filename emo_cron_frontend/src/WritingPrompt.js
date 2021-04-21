import React from 'react';


import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function WritingPrompt({ prompt, getPrompt }) {


    return (
        
        <Card className='m-4 shadow'>
            <Card.Body>
                <Card.Text className='display-5 lead'>Something to write about...</Card.Text>
                <Card.Text className='display-4'>{prompt.prompt}</Card.Text>
                <Button variant='dark' onClick={getPrompt}>GET A NEW PROMPT</Button>
            
            </Card.Body>
        </Card>
        
        )

}

export default WritingPrompt;