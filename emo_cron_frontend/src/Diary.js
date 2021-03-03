import React, { useState } from 'react';

import FeelingsCloud from './FeelingsCloud';


function Diary () {


    const [feelings, setFeelings] = useState([]);
    // const [prompt, setPrompt] = useState('');
    // const [inspiration, setInspiration] = ('');


    //word cloud
    //set feelings in feelings
    //prompt changing
    //inspitation change
    //change prompt
    //handle change
    //handle submit

    return (
        <FeelingsCloud feelings={feelings} setFeelings={setFeelings} />

    )




}


export default Diary;