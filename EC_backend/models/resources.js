const db = require('../db');


class Resources {

    static async getEmotions() {
        const res = await db.query(
            `SELECT emotion
            FROM emotions_list
            ORDER BY RAND()`
        );

        const emotions = res.rows.flat();
        return emotions;
    }

    static async getPrompts() {
        const res = await db.query(
            `SELECT prompt
            from prompts_list
            ORDER BY RAND()
            LIMIT 10`
        );

        const prompts = res.rows.flat();
        return prompts;
    }

    static async addPrompt(prompt) {
        const res = await db.query(
            `INSERT into prompts_list (prompt)
            VALUES ($1)
            RETURNING prompt`, [prompt]
        ); 

        return res.rows[0];
    }

    static async getInspiration() {
        const res = await db.query(
            `SELECT inspiration
            FROM inspirations
            WHERE flagged = FALSE
            ORDER BY RAND()
            LIMIT 1`
        );

        const inspiration = res.rows[0];
        return inspiration;
    }

    static async getInspirations(num) {
        const res = await db.query(
            `SELECT inspiration
            FROM inspirations
            WHERE flagged = FALSE
            ORDER BY RAND()
            LIMIT $1`, [num]
        );

        const inspirations = res.rows.flat()
        return inspirations;
    }

    static async addInspiration(inspiration) {
        const res = await db.query(
            `INSERT into inspirations (inspiration, flagged)
            VALUES ($1, FALSE)
            RETURNING inspiration`, [inspiration]
        );

        return res.rows[0];
    }
}

module.exports = Resources;