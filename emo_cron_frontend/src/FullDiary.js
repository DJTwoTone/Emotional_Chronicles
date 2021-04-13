import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

import ECApi from './ECApi';
import UserContext from './UserContext';

import { DateTime } from 'luxon'


import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function FullDiary () {

    const { loggedInUser } = useContext(UserContext);

    const [entries, setEntries] = useState([])

    useEffect(() => {
        async function getFullDiary() {
            try {
                let fulldiary = await ECApi.getFullDiary(loggedInUser.username);
                setEntries(fulldiary.entries)
            } catch (err) {
                console.error(err)
            }
        }
        getFullDiary();
    }, [loggedInUser]);

    function fullDiary(arr) {

        return (
            
            arr.map((entry) => (
                <Link to={`/entry/${loggedInUser.username}/${DateTime.fromJSDate(entry.date).toISODate()}`}>
                <Card className='my-5 shadow'>
                    <Card.Header className='text-start'>{DateTime.fromISO(entry.date).toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })}</Card.Header>
                    <Card.Body>
                        <blockquote className='blockquote'>
                            <p className='text-truncate'>{entry.entry}</p>
                        </blockquote>
                    </Card.Body>
                </Card>
                </Link>
            ))
        )
    }

    function noDiary() {

        return (
            
            <Card >
                <Card.Body>
                    <blockquote className='blockquote'>
                        <p>Sorry, You haven't written anything. Click on the button and write something.</p>
                    </blockquote>
                    <Link to='/today'>
                <Button className='m-4' variant='dark'>TODAY</Button>
                </Link>
                </Card.Body>
            </Card>
            
        )
    }


    return (
        <Container className='justify-content-center m-5'>

            {entries[0] 
            ? fullDiary(entries)
            : noDiary()
            
            }



        </Container>
        )
}

export default FullDiary;