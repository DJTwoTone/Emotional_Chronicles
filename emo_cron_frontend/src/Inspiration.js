import React, { useState } from 'react';

import ECApi from './ECApi';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function Inspiration () {

    const [insp, setInsp] = useState([])
    const [inspMessage, setInspMessage] = useState('');

    

    //this need deigned
    //possibly an emotion cloud as the background
    //let logged in users 
    
    return (
        <div>
        Inspiration goes here.    
        </div>
            )
}

export default Inspiration;