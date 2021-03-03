//resources for entry
//new entry
//one entry

const db = require('../db');

class Diaries {


    //check if today's entry exists
    static async checkToday(username, today) {
        console.log('username', username);
        console.log('today', today);
        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1 AND date = $2`, [username, today]
        )

        console.log(res.rows)


        if (res.rows.length) {
            return true;
        };

        return false;
    }

    static async addEntry(data) {

        const { username, diaryentry, joy, sadness, fear, surprise, anger, disgust, emotions } = data;
        const no_emotion = data['no-emotion'];

        const entryRes = await db.query(
            `INSERT into diary_entries (username, entry, date, joy, no_emotion, sadness, fear, surprise, anger, disgust)
            VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, username, entry, date, joy, no_emotion, sadness, fear, surprise, anger, disgust`,
            [username, diaryentry, joy, no_emotion, sadness, fear, surprise, anger, disgust]
        );

        let res = entryRes.rows[0];


        // const makeEmoArr = async (arr, id) => {
        //     const promises = arr.map(async (emotion) => {
        //         let emoRes = await db.query(
        //             `INSERT into entries_list_emotions (emotion, diary_entry_id)
        //             VALUES ($1, $2)
        //             RETURNING emotion`, [emotion, id])
        //             return emoRes.rows[0]['emotion']
        //     })

        //     let res = await Promise.all(promises)
        //     return res
        // } 


        const makeEmoArr = (arr, id) => {
            const promises = arr.map(async (emotion) => {
                let emoRes = await db.query(
                    `INSERT into entries_list_emotions (emotion, diary_entry_id)
                    VALUES ($1, $2)
                    RETURNING emotion`, [emotion, id])
                    return emoRes.rows[0]['emotion']
            })

            let res = Promise.all(promises)
            return res
        } 

        const emotionArr = await makeEmoArr(emotions, res.id);
        // const emotionArr = makeEmoArr(emotions, res.id);
        
        return {...res, emotions: emotionArr };
    }

    static async getEntries(username) {
        
        const entriesRes = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1`, [username]
        )
        
        const emoRes = await db.query(
            `SELECT de.id, ele.emotion
            FROM diary_entries AS de
            LEFT JOIN entries_list_emotions AS ele
            ON de.id = ele.diary_entry_id
            WHERE username = $1`, [username]
        )
        
        let entries = entriesRes.rows;
        entries.forEach(entry => {
            entry.emotions = [];
        })
        
        let emos = emoRes.rows;

        emos.forEach(emo => {
            if (emo.emotion) {
                let idx = entries.findIndex(entry => entry.id === emo.id)
                entries[idx].emotions.push(emo.emotion)
        }})

        return entries;
    }

    static async getEntry(username, date) {
        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1 AND date = $2`, 
            [username, date]
        );

        //get the emotions
        console.log(res)

        let entry = res.rows[0];
        console.log(entry)
        entry.emotions = [];

        const emoRes = await db.query(
            `SELECT emotion
            FROM entries_list_emotions
            WHERE diary_entry_id = $1`, [entry.id]
        )

        emoRes.rows.forEach(emo => {
            entry.emotions.push(emo)
        })

        return entry;
    }

    static async getMonth(username, dateInMonth) {
        const dateObj = new Date(dateInMonth)
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth()
        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE "username" = $1 AND date_part('month', date) = $2 AND date_part('year', date) = $3`, 
            [username, month, year]
        );

        return res.rows;
    }

    


}

module.exports = Diaries;