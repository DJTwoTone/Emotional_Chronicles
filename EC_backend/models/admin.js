//get inspirations to be approved
//add inspiration
//approve inspiration
//delete inspiration
//get prompts to be approved
//add prompt
//approve prompt
//delete prompt


const db = require('../db');

class Admin {

    // static async addPrompt(prompt) {
    //     const res = await db.query(
    //         `INSERT into prompts_list (prompt)
    //         VALUES ($1)
    //         RETURNING prompt`, [prompt]
    //     ); 

    //     return res.rows[0];
    // }

    // static async addInspiration(inspiration) {
    //     const res = await db.query(
    //         `INSERT into inspirations (inspiration, flagged)
    //         VALUES ($1, FALSE)
    //         RETURNING inspiration`, [inspiration]
    //     );

    //     return res.rows[0];
    // }

    static async getFlaggedInspiration() {
        const res = await db.query(
            `SELECT id, inspiration, flagged
            FROM inspirations
            WHERE flagged = TRUE`
        );

        return res.rows;
    }

    static async approveInspiration(id) {
        const res = await db.query(
            `UPDATE inspirations
            SET flagged = FALSE
            WHERE id = $1
            RETURNING inspiration`, [id]
        );

        return res.rows[0]
    }

    static async delInspiration(id) {
        const res = await db.query(
            `DELETE from inspirations
            WHERE id = $1
            RETURNING inspiration`, [id]
        );

        return res.rows[0]
    }
}

module.exports = Admin;