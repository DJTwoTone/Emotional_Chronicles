import React from 'react';

import Image from 'react-bootstrap/Image'

import diaryhero from'./img/diaryhero.png'


function Home () {


    //this need deigned
    //possibly an emotion cloud as the background
    
    return (
        <div>
        <h1>Welcome to your Emotional Chronicles</h1>
        <Image src={diaryhero} fluid/>
        
        </div>
            )
}

export default Home;