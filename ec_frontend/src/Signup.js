import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form : {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit : {
        margin: theme.spacing(3, 0, 2)
    }
}))

//cosider adding some ispiration

function Signup () {

    const classes = useStyles();
    const [signupInfo, setSignupInfo] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        errors: []
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setSignupInfo(info => ({
            ...info,
            [name]: value
        }))
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            firstname: signupInfo.firstname,
            lastname: signupInfo.lastname,
            username: signupInfo.username,
            email: signupInfo.email,
            password: signupInfo.password
        }

        try {
            
            //do the signup dance

        } catch (errors) {
            return setSignupInfo(info => ({...info, errors}))
        }

        //set a token history push home
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Typography component='h1' variant='h3'>
                    SIGN UP
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            name='firstname'
                            variant='outlined'
                            required
                            fullWidth
                            id='firstname'
                            label="FIRST NAME"
                            value={signupInfo.firstname}
                            onChange={handleChange}
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='lastname'
                            label="LAST NAME"
                            name='lastname'
                            value={signupInfo.lastname}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            variant='outlined'
                            required
                            fullWidth
                            id='username'
                            label="USERNAME"
                            name='username'
                            value={signupInfo.username}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            variant='outlined'
                            required
                            fullWidth
                            id='email'
                            label="EMAIL"
                            name='email'
                            value={signupInfo.email}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            variant='outlined'
                            required
                            fullWidth
                            name='password'
                            label="PASSWORD"
                            type='password'
                            id='password'
                            value={signupInfo.password}
                            onChange={handleChange}

                            />

                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onSubmit={handleSubmit}
                    >
                        SIGN UP
                    </Button>
                </form>
            </div>
        </Container>
            )
}

export default Signup;