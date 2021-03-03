import React from 'react';
import { Tagcloud } from 'react-tag-cloud';

import getFormattedEmotions from './hooks/getFormattedEmotions'
// import ECApi from './ECApi';

function FeelingsCloud ({ feelings, setFeelings }) {

    const emotions = getFormattedEmotions(25);

    const customRender = (tag, size, color) => (
        <span>
            key={tag.value}
            style={{
                margin: '4px',
                display: 'inline-block',
                transform: `rotate(${Math.floor(Math.random() * 90) - 45}deg)`,
                fontSize: `${tag.count + size}px`,
                color: `${color}`
            }}
        </span>
    )


    function handleClick(tag) {
        const feeling = tag.value;
        if (feelings.indexOf(feeling) === -1) {
            setFeelings(feelings => [...feelings, feeling])
        }   else {
            setFeelings(feelings.filter(f => f !== feeling));
        }
    }


    return (
        <div>
            <Tagcloud tags={emotions} maxSize={40} minSize={20} renderer={customRender} onClick={handleClick} />
        </div>
    )
}


export default FeelingsCloud;