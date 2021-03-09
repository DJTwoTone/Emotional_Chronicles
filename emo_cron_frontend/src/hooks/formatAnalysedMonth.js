import ECApi from '../ECApi';
import { DateTime } from 'luxon'


//take in the date
//hgold off on this -- but still reformatt for the range
//get the entries from that month plus and minus one day
// ?first day of month - 1 || ?last day of month + 1
//change the month search to use range
// create obj for each day -- if in the returned data, add data to the obj if not add zeros
/**
 * obj {
 *  date:
 *  disgust:
 * fear:
 * joy:
 * sadness:
 * surprise:
 * trust:
 * } 
 */



async function formatAnalysedMonth(username, date) {

    async function getAnalysedMonth(username, date) {

        // console.log('in the month before api call', username, date)
        // console.log('datetime testing', [...Array(date.daysInMonth)]) //

        const res = await ECApi.getMonthOfEntries(username, date);
        // console.log('in get month', res)
        return res;
    }
    
    // function createMonthObj(date) {





    // }

    function formatMonthEmotions(arr, date) {

        let dataArr = []
        //daysInMonth
        //startOf('month')
        let start = date.startOf('month')

        for (let i = 0; i < date.daysInMonth; i++) {
            let entry = {}
            for (let j = 0; j < arr.length; j++) {

                if (DateTime.fromISO(arr[j].date).hasSame(start, 'day')) {
                    entry = arr[j];
                }
            }
            
            let entryObj = {
                date: start.toISODate(),
                disgust: Math.round(entry.disgust * 100) || 0,
                fear: Math.round(entry.fear * 100) || 0,
                joy: Math.round(entry.joy * 100) || 0,
                sadness: Math.round(entry.sadness * 100) || 0,
                surprise: Math.round(entry.surprise * 100) || 0,
                trust: Math.round(entry.trust * 100) || 0
            }
            dataArr.push(entryObj);
            start = start.plus({ days: 1 })
        }

        return dataArr

    }

    const res = await getAnalysedMonth(username, date)
    const data = formatMonthEmotions(res, date)
    return data ;
}

export default formatAnalysedMonth;