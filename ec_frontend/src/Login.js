import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)    
    },
    submit : {
        margin: theme.spacing(3, 0, 2)
    }
}))


function Login () {

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        errors: []
    })

    const classes = useStyles();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setLoginInfo(info => ({
            ...info,
            [name]: value
        }))
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            username: loginInfo.username,
            password: loginInfo.password
        }

        try {
            
            //do the login dance

        } catch (errors) {
            return setLoginInfo(l => ({...l, errors}))
        }

        //set a token and history push to home
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Typography component='h1' variant='h3'>
                    LOGIN
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label="USERNAME"
                        name='username'
                        value={loginInfo.username}
                        onChange={handleChange}
                        autofocus
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label="PASSWORD"
                        type='password'
                        id='password'
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onSubmit={handleSubmit}
                    >
                        LOGIN
                    </Button>

                </form>
            </div>
        </Container>
            )
}

export default Login;