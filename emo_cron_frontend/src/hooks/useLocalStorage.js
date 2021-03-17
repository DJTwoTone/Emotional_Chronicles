import { useState, useEffect} from 'react';


function useLocalStorage(key, value = null) {

    const valueData = localStorage.getItem(key) || value;

    const [storage, setStorage] = useState(valueData);

    useEffect(() => {

        
        if (!storage) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, storage)
        }
    }, [key, storage]);

    return [storage, setStorage]

}

export default useLocalStorage