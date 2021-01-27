//resources for entry
//new entry
//one entry

const db = require('../db');

class Diary {

    static async addEntry(data) {

        const {username, entry, joy, no_emotion, saddness, fear, surprise, anger, disgust, emotions} = data;

        const EntryRes = await db.query(
            `INSERT into diary_entries (username, entry, date, joy, no_emotion, saddness, fear, surprise, anger, disgust)
            VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, username, entry, date, joy, no_emotion, saddness, fear, surprise, anger, disgust`,
            [username, entry, joy, no_emotion, saddness, fear, surprise, anger, disgust]
        );

        let entry = entryRes.rows[0];

        let emotionArr = emotions.map(async (emotion) => {
            await db.query(
                `INSERT into entries_list_emotions (emotion, diary_entry_id)
                VALUES ($1, $2)
                RETURNING emotion`, [emotion, entry.id]) 
        } )


        //gotta add the emotions
        return {...entry, emotions: emotionArr };
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