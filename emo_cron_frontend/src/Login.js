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
        
        let data = {
            username: loginInfo.username,
            password: loginInfo.password
        }


        try {

            const token = await ECApi.login(data);
            setToken(token);
            //check todaysentry - settodays entry 
            history.push('/')
            
        } catch (err) {

            return setLoginInfo(info => ({
                ...info,
                errors: err
            }))
        }
    }
    
    
    return (
        <Container className='justify-content-center'>

            <Card className='m-5 shadow'>

                <Card.Header bg='primary' text='white'>LOGIN</Card.Header>

                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='username'>
                            <Form.Label>USERNAME</Form.Label>
                            <Form.Control 
                                className='shadow'
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
                                className='shadow' 
                                type='password'
                                name='password'
                                placeholder='Your Password'
                                value={loginInfo.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button 
                            className='shadow'
                            variant='dark'
                            type='submit'
                        >
                            SUBMIT
                        </Button>

                        {loginInfo.errors 
                        ? loginInfo.errors.map((error) => {
                            return (<Form.Text className="text-danger">
                                {error}
                            </Form.Text>)
                        })
                        : null}
                    </Form>
                </Card.Body>

            </Card>
        </Container>
            )
}

export default Login;