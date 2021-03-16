import React, { useState } from 'react';

import Diary from './Diary';

function Today () {

    const [writtenToday, setWrittenToday] = useState(false);

    
    return (
        <Diary />
    )
}

export default Today;