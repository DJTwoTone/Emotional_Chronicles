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
}

module.exports = Resources;