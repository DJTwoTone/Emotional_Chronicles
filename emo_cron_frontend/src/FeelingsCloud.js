import React, { useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud'

import getFormattedEmotions from './hooks/getFormattedEmotions'
// import ECApi from './ECApi';

function FeelingsCloud ({ feelings, setFeelings }) {

    const [emotions, setEmotions] = useState([])

    useEffect(() => {
        async function fetchEmotions() {
            const emos = await getFormattedEmotions(25);
            setEmotions(emos);
        }
        fetchEmotions();
    }, []);


    console.log(emotions)

    const customRender = (tag, size, color) => (
        <span
        key={tag.value}
        style={{
            margin: '4px',
            display: 'inline-block',
            transform: `rotate(${Math.floor(Math.random() * 90) - 45}deg)`,
            fontSize: `${tag.count + size}px`,
            color: `${color}`
        }}  
        >
            {tag.value}
        </span>
    )


    function handleClick(tag) {
        console.log(tag)
        const feeling = tag.value;
        if (feelings.indexOf(feeling) === -1) {
            setFeelings(feelings => [...feelings, feeling])
        }   else {
            setFeelings(feelings.filter(f => f !== feeling));
        }
        console.log(feelings)
    }


    return (
        <div>
            <TagCloud tags={emotions} maxSize={20} minSize={10} renderer={customRender} onClick={handleClick} />
            {/* <p>the clous should go here</p> */}
        </div>
    )
}


export default FeelingsCloud;