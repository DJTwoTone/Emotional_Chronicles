import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import PlutchikWheel from './img/PlutchikWheel.svg.png';


function HowItWorks() {


    return (
        <Container fluid className='justify-content-center'>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title className='display-3 shadow'>How It Works</Card.Title>
                    <Card.Text>
                        It's important, especially in this day and age, to be in touch with your emotions. That's the reason this app was developed.
                    </Card.Text>
                    <Card.Text>
                        But how can I do that?
                    </Card.Text>
                    <Card.Text>
                        WELL!! It's easy!
                        Just click on the "TODAY" at the top.
                        If you haven't written an entry yet today, you given a from.
                        First, you will see some randomly selected feelings. Go ahead a click on the ones that you are feeling today
                        Next, take a look at the writing prompt.
                        If you don't like it, go ahead and click for a new one.
                        Then, getting to writing on your prompt. (If you need a little inspiration, scroll down a little. We have you covered.)
                        Once you're done, record your entry.    
                    </Card.Text>
                    <Card.Text>
                        Your writing will be shuffled off to an emotion analysis algorithm.
                        When we get the analysis back, we'll do a little dance, make a little love, and math down the numbers.
                        We'll then show you what emotions your writing might be showing.  
                    </Card.Text>
                    <Card.Subtitle>
                        *NOTE: WE ARE NOT PYSHOLOGISTS! We don't claim to be psychologists. If you are feeling any emotional distress, please see a trained professional. 
                    </Card.Subtitle>
                    <Card.Text>
                        If you've already written today, you will be shuffled off to the calendar.
                        On the calendar, you see how your emotions have dipped and peaked over a month, 
                        and access all your past entries. Revisit old feelings and thought, and check up how you are doing.
                    </Card.Text>
                    <Card.Text>
                        In addition, if you need inspiration at any time, go ahead and click "INSPIRATION" above.
                        That'll give you access to our curated list of inspirational quotations and phrase.
                        Also, feel free to share anything that has inspired you.
                    </Card.Text>
                    <Card.Text>
                        That's it. Go forward and feel better.
                    </Card.Text>
                    <Image src={PlutchikWheel} fluid/>

                </Card.Body>
            </Card>


        </Container>


    )


}

export default HowItWorks;















