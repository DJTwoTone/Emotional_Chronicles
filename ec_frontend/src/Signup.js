import React from 'react';
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



function Signup () {

    const classes = useStyles();

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
                            name='firstName'
                            variant='outlined'
                            required
                            fullWidth
                            id='firstName'
                            label="FIRST NAME"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='lastName'
                            label="LAST NAME"
                            name='lastName'
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
                            />

                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        SIGN UP
                    </Button>
                </form>
            </div>
        </Container>
            )
}

export default Signup;