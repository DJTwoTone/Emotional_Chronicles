import ECApi from '../ECApi';
import { DateTime } from 'luxon'



class MonthFormatter {

    static async getAnalysedMonth(username, date) {

        let res = await ECApi.getMonthOfEntries(username, date);

        return res;
    }

    static async formatMonthEmotions(username, date) {
        let dataArr = []

        let arr = await this.getAnalysedMonth(username, date);

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

    static async  formatMonthDisabledDates(username, date) {

        let dataArr = [];

        let entryArr = await this.getAnalysedMonth(username, date);


        let start = date.startOf('month');

        for (let i = 1; i < date.daysInMonth; i++) {
            dataArr.push(start.toISODate())
            start = start.plus({ days: 1})
        }

        for (let entryDay of entryArr) {
            
            dataArr = [...dataArr.filter(day => day !== DateTime.fromISO(entryDay.date).toISODate())]
            
        }
        
        return dataArr;

    }

    static async formatMonthColorClass(username, date) {

        let dataArr = [];

        let entryArr = await this.getAnalysedMonth(username, date);

        for (let entryDay of entryArr) {
            let emotions = {
                disgust: entryDay.disgust,
                fear: entryDay.fear,
                joy: entryDay.joy,
                sadness: entryDay.sadness,
                surprise: entryDay.surprise,
                trust: entryDay.trust

            }
            
            let classObj = {
                date: DateTime.fromISO(entryDay.date).toISODate(),
                class: Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)[0] 
            }
            
            dataArr.push(classObj)
        }

        

        return dataArr;
    }
}

export default MonthFormatter;
