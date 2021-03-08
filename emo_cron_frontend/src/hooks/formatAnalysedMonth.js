import ECApi from '../ECApi';
import { DateTime } from 'luxon'

async function formatAnalysedMonth(username, date) {

    async function getMonth(username, date) {

        // console.log('in the month before api call', username, date)
        console.log('datetime testing', [...Array(date.daysInMonth)])

        const res = await ECApi.getMonthOfEntries(username, date);
        // console.log('in get month', res)
        return res;
    }
    
    // function createMonthObj(date) {





    // }

    // function formatMonthEmotions(arr) {


    // }

    

    const data = await getMonth(username, date)
    console.log(data);
    return data ;
}

export default formatAnalysedMonth;