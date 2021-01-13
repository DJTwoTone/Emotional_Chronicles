const db = require('../db');
const bcrypt = require('bcrypt');
const ExpressError = require('../helpers/expressError');
const { partialUpdateSQL } = require('../helpers/partialUpdate');

const BCRYPT_WORK_FACTOR = 12;

class User {

    static async userCheck(username) {
        const res = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`, [username]
        )

        if (res.rows.length) {
            return true;
        };

        return false;
    }

    static async register(data) {
        const { username, password, first_name, last_name, email } = data;

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const res = await db.query(
            `INSERT into users (username, password, first_name, last_name, email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, password, first_name, last_name, email`,
            [username, hashedPassword, first_name, last_name, email]
        );

        return res.rows[0];
    }

    static async getUser(username) {
        const res = await db.query(
            `SELECT username, first_name. last_name, email
            FROM users
            WHERE username = $1`, [username]
        );

        const user = res.rows[0];

        return user;
    }

    static async update(username, data) {

        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        let { query, values } = partialUpdateSQL("users", data, "username", username);

        const res = await db.query(query, values);
        const user = res.rows[0];

        delete user.password;
        delete user.isAdmin;

        return user;
    }

    static async delete(username) {
        const res = await db.query(
            `DELETE FROM users
            WHERE username = $1
            RETURNING username`, [username]
        );
    }

    static async authenticate(data) {
        const res = await db.query(
            `SELECT username, password, first_name, last_name, email
            FROM users
            WHERE username = $1`, [username]
        );

        const user = result.rows[0];

        if(user) {
            const isValid = await bcrypt.compare(data.password, user.password);
            if (isValid) {
                return user;
            }
        }

        throw new ExpressError("Sorry. That password doesn't work", 401)
    }

}

module.exports = User;