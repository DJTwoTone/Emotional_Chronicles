//get inspiration
//get inspirations
//add inspiration
//get emotions
//get prompt
//get prompts
//add prompt


const db = require('../db');


class Resources {

    static async getEmotions(num) {
        const res = await db.query(
            `SELECT emotion
            FROM emotions_list
            ORDER BY RAND()
            LIMIT $1`, [num]
        );

        const emotions = res.rows.flat();
        return emotions;
    }

    static async getPrompts(num) {
        const res = await db.query(
            `SELECT prompt
            from prompts_list
            WHERE flagged = FALSE
            ORDER BY RAND()
            LIMIT $1`, [num]
        );

        const prompts = res.rows.flat();
        return prompts;
    }

    static async addPrompt(prompt, flagged) {
        const res = await db.query(
            `INSERT into prompts_list (prompt, flagged)
            VALUES ($1, $2)
            RETURNING prompt`, [prompt, flagged]
        ); 

        return res.rows[0];
    }

    static async changePromptFlag(id, flagged) {
        const res = await db.query(
            `UPDATE prompts_list
            SET flagged = $1
            WHERE id = $2
            RETURNING *`, [flagged, id]
        );

        return res.rows[0];
    }

    static async deletePrompt(id) {
        const res = await db.query(
            `DELETE FROM prompts_list
            WHERE id = $1
            RETURNING prompt`, [id]
        )
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

    static async getInspirations(num, flagged) {
        const res = await db.query(
            `SELECT inspiration
            FROM inspirations
            WHERE flagged = $1
            ORDER BY RAND()
            LIMIT $2`, [flagged, num]
        );

        const inspirations = res.rows.flat()
        return inspirations;
    }

    static async addInspiration(inspiration, flagged) {
        const res = await db.query(
            `INSERT into inspirations (inspiration, flagged)
            VALUES ($1, $2)
            RETURNING inspiration`, [inspiration, flagged]
        );

        return res.rows[0];
    }

    static async changeInspirationFlag(id, flagged) {
        const res = await db.query(
            `UPDATE inspirations
            SET flagged = $1
            WHERE id = $2
            RETURNING *`, [flagged, id]
        )

        return res.rows[0]
    }

    static async deleteInspiration(id) {
        const res = await db.query(
            `DELETE FROM inspirations
            WHERE id = $1
            RETURNING inspiration`, [id]`
        )
    }

}

module.exports = Resources;