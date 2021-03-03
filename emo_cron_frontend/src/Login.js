import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ECApi from './ECApi';

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function Login ({ setToken }) {

    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
        errors: []
    })

    function handleChange(evt) {
        const { name, value } = evt.target;

        setLoginInfo(info => ({
            ...info,
            [name]: value
        }))
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log('submitted')
        let data = {
            username: loginInfo.username,
            password: loginInfo.password
        }

        try {

            const token = await ECApi.login(data);
            setToken(token);
            history.push('/')
            
        } catch (err) {
            return setLoginInfo(info => ({
                ...info,
                errors: err
            }))
        }
    }
    
    //possibly an emotion cloud as the background
    //add error handling
    
    return (
        <Container className='justify-content-center'>

            <Card className='m-5'>

                <Card.Header bg='primary' text='white'>LOGIN</Card.Header>

                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='username'>
                            <Form.Label>USERNAME</Form.Label>
                            <Form.Control 
                                type='text'
                                name='username'
                                placeholder='Your Username' 
                                value={loginInfo.username}
                                onChange={handleChange}    
                            />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control 
                                type='password'
                                name='password'
                                placeholder='Your Password'
                                value={loginInfo.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button 
                            variant='primary'
                            type='submit'
                        >
                            SUBMIT
                        </Button>
                    </Form>
                </Card.Body>

            </Card>
        </Container>
            )
}

export default Login;