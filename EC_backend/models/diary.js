//resources for entry
//new entry
//one entry

const db = require('../db');

class Diary {

    static async addEntry(data) {

        const { username, diaryentry, joy, sadness, fear, surprise, anger, disgust, emotions } = data;
        const no_emotion = data['no-emotion'];
        console.log('before entry insert')

        // you nee the date
        const entryRes = await db.query(
            `INSERT into diary_entries (username, entry, date, joy, no_emotion, sadness, fear, surprise, anger, disgust)
            VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, username, entry, date, joy, no_emotion, sadness, fear, surprise, anger, disgust`,
            [username, diaryentry, joy, no_emotion, sadness, fear, surprise, anger, disgust]
        );

        let res = entryRes.rows[0];
        console.log('res', res);
        console.log('before emotion insert');


        const makeEmoArr = async (arr) => {
            const promises = arr.map(async (emotion) => {
                await db.query(
                    `INSERT into entries_list_emotions (emotion, diary_entry_id)
                    VALUES ($1, $2)
                    RETURNING emotion`, [emotion, res.id]) 
            })
            return Promise.all(promises)
        } 

        const emotionArr = await makeEmoArr(emotions);
        


        console.log('emoArry', emotionArr)
        return {...res, emotions: emotionArr };
    }

    static async getEnties(username) {
        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1`, [username]
        )

        //get the emotions

        let entries = res.rows;

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

        let entry = res.rows[0];

        return entry;
    }

    static async getMonth(username, date) {
        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1 AND MONTH(date) = MONTH($2) AND YEAR(date) = YEAR($2)`, 
            [username, date]
        );

        return res.rows;
    }
}

module.exports = Diary;