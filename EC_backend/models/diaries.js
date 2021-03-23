//resources for entry
//new entry
//one entry

const db = require('../db');
const { DateTime } = require("luxon");

class Diaries {


    //check if today's entry exists
    static async checkToday(username, today) {

        const date = DateTime.fromISO(today).toUTC()

        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1 AND date = $2`, [username, date]
        )

        if (res.rows[0]) {
            return true;
        };

        return false;
    }

    static async addEntry(data) {

        const { username, diaryentry, joy, sadness, fear, surprise, anger, disgust, emotions, prompt_id, inspiration_id } = data;
        const no_emotion = data['no-emotion'];

        const entryRes = await db.query(
            `INSERT into diary_entries (username, entry, date, joy, no_emotion, sadness, fear, surprise, anger, disgust, prompt_id, inspiration_id)
            VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id, username, entry, date, joy, no_emotion, sadness, fear, surprise, anger, disgust `,
            [username, diaryentry, joy, no_emotion, sadness, fear, surprise, anger, disgust, prompt_id, inspiration_id]
        );
        // console.log('in the adding diary modfel', entryRes.rows[0])
        let res = entryRes.rows[0];


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

        const prompt = await db.query(
            `SELECT prompt
            FROM prompts_list
            WHERE id = $1`, [prompt_id]
            )

        const inspiration = await db.query(
            `SELECT inspiration
            FROM inspirations
            WHERE id = $1`, [inspiration_id]
        )



        const emotionArr = await makeEmoArr(emotions, res.id);
        // const emotionArr = makeEmoArr(emotions, res.id);
        
        return {...res, emotions: emotionArr, prompt: prompt.rows[0].prompt, inspiration: inspiration.rows[0].inspiration };
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
        
        if (entries[0].emotions) {
            entries.forEach(entry => {
                entry.emotions = [];
            })
            
            let emos = emoRes.rows;
    
            emos.forEach(emo => {
                let idx = entries.findIndex(entry => entry.id === emo.id)
                entries[idx].emotions.push(emo.emotion)
                })

        }

        // console.log('entries in trhe model', entries)

        return entries;
    }

    static async getEntry(username, date) {
        
        
        let dateObj = DateTime.fromISO(date);
        const utcDate = dateObj.toUTC()
        
        let res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE username = $1 AND date = $2 `, 
            [username, utcDate]
        );
        // let res = await db.query(
        //     `SELECT *
        //     FROM diary_entries
        //     WHERE username = $1 AND date_part('month', date) = $2 AND date_part('year', date) = $3 AND date_part('day', date) = $4`, 
        //     [username, month, year, day]
        // );


        //get the emotions
        // console.log('THE DB SEARCH', res.rows)

        if (!res.rows[0]) return {}
        
        let entry = res.rows[0];
        // console.log('entry', entry)
       
        
        entry.emotions = [];

        let emoRes = await db.query(
            `SELECT emotion
            FROM entries_list_emotions
            WHERE diary_entry_id = $1`, [entry.id]
        )

        if (emoRes.rows) {
            emoRes.rows.forEach(emo => {
                entry.emotions.push(emo)
            })

        }

        let prompt = await db.query(
            `SELECT prompt
            FROM prompts_list
            WHERE id = $1`, [entry.prompt_id]
            )

        let inspiration = await db.query(
            `SELECT inspiration
            FROM inspirations
            WHERE id = $1`, [entry.inspiration_id]
        )

        entry.prompt = prompt.rows[0].prompt
        entry.inspiration = inspiration.rows[0].inspiration

        return entry;
    }

    static async getMonth(username, dateInMonth) {
        let dateObj = DateTime.fromISO(dateInMonth)
        const year = dateObj.year
        //Warning Off by 1 error likely here
        const month = dateObj.month

        const start = dateObj.startOf('month').toUTC()
        const end = dateObj.endOf('month').toUTC();
        // console.log('date', dateObj, 'year', year, 'month', month, username)

        const res = await db.query(
            `SELECT *
            FROM diary_entries
            WHERE "username" = $1 AND date BETWEEN $2 AND $3`, 
            [username, start, end]
        );
        // const res = await db.query(
        //     `SELECT *
        //     FROM diary_entries
        //     WHERE "username" = $1 AND date_part('month', date) = $2 AND date_part('year', date) = $3`, 
        //     [username, month, year]
        // );

        // console.log('res in the model',res)

        return res.rows;
    }

    


}

module.exports = Diaries;