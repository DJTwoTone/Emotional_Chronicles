import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ECApi from './ECApi';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Signup ({setToken}) {

    const history = useHistory();
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        errors: []
    })

    function handleChange(evt) {
        const { name, value } =evt.target;

        setSignupInfo(info => ({
            ...info,
            [name]: value
        }))
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            username: signupInfo.username,
            password: signupInfo.password,
            firstName: signupInfo.firstName,
            lastName: signupInfo.lastName,
            email: signupInfo.email
        }

        try {
            let token = await ECApi.registerUser(data);
            setToken(token);
            history.push('/');


        } catch (err) {
            return setSignupInfo(info => ({
                ...info,
                errors: err
            }))
            
        }
    }


    
    //possibly an emotion cloud as the background
    
    return (
        <Container className='justify-centent-center'>
            <Card className='m-5'>
                <Card.Header bg='primary' text='white'>SIGNUP</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId='username'>
                            <Form.Label>USERNAME</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                placeholer='Pick a Username'
                                value={signupInfo.username}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Pick a Username
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='firstName'>
                            <Form.Label>GIVEN NAME</Form.Label>
                            <Form.Control
                                type='text'
                                name='firstName'
                                placeholer='What name was given to you?'
                                value={signupInfo.firstName}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                What name was given to you?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='lastName'>
                            <Form.Label>FAMILY NAME</Form.Label>
                            <Form.Control
                                type='text'
                                name='lastName'
                                placeholer='What is your family name?'
                                value={signupInfo.lastName}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                What is your family name?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                placeholer='Please share your email address.'
                                value={signupInfo.email}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Please share your email address.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                placeholer='Choose a unique password'
                                value={signupInfo.password}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Choose a unique password
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            onSubmit={handleSubmit}
                        >
                            SUBMIT
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

            )
}

export default Signup;