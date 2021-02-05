import { useState, useEffect } from 'react';

function useLocalStorage(key, firstValue = null) {
    const intialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(intialValue);

    useEffect(() => {
        if (!item) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [key, setItem];
}

export default useLocalStorage;