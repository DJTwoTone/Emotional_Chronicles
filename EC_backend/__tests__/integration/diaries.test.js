// symantoCall = jest.fn(() => [
//     {
//         "id": null,
//         "predictions": [
//             {
//                 "prediction": "joy",
//                 "probability": 0.123
//             },
//             {
//                 "prediction": "no-emotion",
//                 "probability": 0.234
//             },
//             {
//                 "prediction": "sadness",
//                 "probability": 0.345
//             },
//             {
//                 "prediction": "fear",
//                 "probability": 0.543
//             },
//             {
//                 "prediction": "surprise",
//                 "probability": 0.963
//             },
//             {
//                 "prediction": "anger",
//                 "probability": 0.741
//             },
//             {
//                 "prediction": "disgust",
//                 "probability": 0.753
//             }

//         ]
//     }
// ])

const request = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../../app');
const db = require('../../db');
const Diaries = require('../../models/diaries');

let testData = {}

beforeEach(async function() {
    try {
        // jest.setTimeout(20000)
        const hashedPassword = await bcrypt.hash('password', 1);
        const testUser = await db.query(
            `INSERT INTO users (username, password, first_name, last_name, email, is_admin)
            VALUES ('testuser', $1, 'testy', 'mctestface', 'test@test.test', false)
            RETURNING *`,
            [hashedPassword]
        )

        testData.user = testUser.rows[0];

        const userRes = await request(app)
        .post('/login')
        .send({
            username: 'testuser',
            password: 'password'
        });

        testData.user.token = userRes.body.token;

        const testAdmin = await db.query(
            `INSERT INTO users (username, password, first_name, last_name, email, is_admin)
            VALUES ('testadmin', $1, 'testy', 'mctestface', 'test@test.test', true)
            RETURNING *`,
            [hashedPassword]
        )

        testData.admin = testAdmin.rows[0];

        
        const adminRes = await request(app)
        .post('/login')
        .send({
            username: 'testadmin',
            password: 'password'
        });

        testData.admin.token = adminRes.body.token;

        await db.query(
            `INSERT INTO prompts_list (prompt, flagged)
            VALUES ('What is your number one goal this year?', true)`
        )

        await db.query(
            `INSERT INTO prompts_list (prompt, flagged)
            VALUES ('What are you most grateful for?', true)`
        )

        await db.query(
            `INSERT INTO prompts_list (prompt, flagged)
            VALUES ('Are you content?', true)`
        )

        await db.query(
            `INSERT INTO prompts_list (prompt, flagged)
            VALUES ('What is your best memory of last year?', false)`
        )

        await db.query(
            `INSERT INTO prompts_list (prompt, flagged)
            VALUES ('What was the last major accomplishment you had?', false)`
        )

        await db.query(
            `INSERT INTO prompts_list (prompt, flagged)
            VALUES ('What possession could you not live without?', false)`
        )

        await db.query(
            `INSERT INTO inspirations (inspiration, flagged)
            VALUES ('All our dreams can come true, if we have the courage to pursue them.” – Walt Disney', true)`
        )

        await db.query(
            `INSERT INTO inspirations (inspiration, flagged)
            VALUES ('The secret of getting ahead is getting started.” – Mark Twain', true)`
        )

        await db.query(
            `INSERT INTO inspirations (inspiration, flagged)
            VALUES ('I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed.” – Michael Jordan', true)`
        )

        await db.query(
            `INSERT INTO inspirations (inspiration, flagged)
            VALUES ('“Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.” – Mary Kay Ash', false)`
        )

        await db.query(
            `INSERT INTO inspirations (inspiration, flagged)
            VALUES ('“The best time to plant a tree was 20 years ago. The second best time is now.” – Chinese Proverb', false)`
        )

        await db.query(
            `INSERT INTO inspirations (inspiration, flagged)
            VALUES ('“Only the paranoid survive.” – Andy Grove', false)`
        )

        await db.query(
            `INSERT INTO emotions_list (emotion)
            VALUES ('afraid')`
        )

        await db.query(
            `INSERT INTO emotions_list (emotion)
            VALUES ('nervous')`
        )

        await db.query(
            `INSERT INTO emotions_list (emotion)
            VALUES ('petrified')`
        )

        await db.query(
            `INSERT INTO emotions_list (emotion)
            VALUES ('skeptical')`
        )

        await db.query(
            `INSERT INTO emotions_list (emotion)
            VALUES ('uptight')`
        )

        await db.query(
            `INSERT INTO emotions_list (emotion)
            VALUES ('choleric')`
        )

        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '111Kiicking ass and taking names', '2020-12-14', 4, 5, 0.1234, 0.2345, 0.3456, 0.4567, 0.5678, 0.6789, 0.789, 0.258, 0.369)`
        )
    
        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '222Kiicking ass and taking names', '2021-01-14', 5, 4, 0.1234, 0.2345, 0.3456, 0.4567, 0.5678, 0.6789, 0.789, 0.258, 0.369)`
        )
    
        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '333Kiicking ass and taking names', '2021-02-14', 6, 6, 0.369, 0.1234, 0.258, 0.3456, 0.2345, 0.346, 0.4567, 0.2345, 0.3456)`
        )
    
        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '444Kiicking ass and taking names', '2021-03-01', 4, 5, 0.679, 0.3258, 0.467, 0.5678, 0.6789, 0.235, 0.3456, 0.5678, 0.278)`
        )
    
        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '555Kiicking ass and taking names', '2021-03-02', 5, 4, 0.134, 0.3969, 0.534, 0.7389, 0.2758, 0.369, 0.1234, 0.2345, 0.2345)`
        )
    
        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '666Kiicking ass and taking names', '2021-03-03', 6, 6, 0.1234, 0.2345, 0.3456, 0.4567, 0.5678, 0.6789, 0.789, 0.258, 0.369)`
        )
    
        await db.query(
            `INSERT INTO diary_entries ( username, entry, date, prompt_id, inspiration_id, joy, no_emotion, sadness, fear, surprise, anger, disgust, anticipation, trust)
            VALUES ('testuser', '777Kiicking ass and taking names', '2021-03-04', 4, 5, 0.568, 0.6789, 0.789, 0.4567, 0.5678, 0.789, 0.7891, 0.2586, 0.3691)`
        )

    } catch (error) {
        console.error('Before Each',error);
    }
})

afterEach(async function() {
    try {
        await db.query('DELETE FROM users')
        await db.query('DELETE FROM diary_entries CASCADE')
        await db.query('ALTER SEQUENCE diary_entries_id_seq RESTART WITH 1')
        await db.query('DELETE FROM prompts_list')
        await db.query('ALTER SEQUENCE prompts_list_id_seq RESTART WITH 1')
        await db.query('DELETE FROM inspirations')
        await db.query('ALTER SEQUENCE inspirations_id_seq RESTART WITH 1')
        await db.query('DELETE FROM emotions_list')

        testData = {}
    } catch (error) {
        console.error('After Each', error);
    }
})

afterAll(async function() {
    try {
        // jest.clearAllTimers()
        await db.end()
    } catch (error) {
        console.error('After All', error)
    }
})

describe("test GET routes for users", () => {

    // test("check if a diary entry has been made for a day", async function() {

    //     const responceTrue = await request(app)
    //     .get(`/diaries/${testData.user.username}/2021-03-04/check`)
    //     .send({
    //         _token: testData.user.token
    //     })
    //     expect(responceTrue.body.entered).toBe(true);
    //     expect(responceTrue.body.date).toBe('2021-03-04');
        
    //     const responceFalse = await request(app)
    //     .get(`/diaries/${testData.user.username}/2019-03-04/check`)
    //     .send({_token: testData.user.token})

    //     expect(responceFalse.body.entered).toBe(false);
    //     expect(responceFalse.body.date).toBe('2019-03-04');
    // })

    // test("get a diary entry for a single day", async function() {

    //     const responce = await request(app)
    //     .get(`/diaries/${testData.user.username}/2021-03-04`)
    //     .send({ _token: testData.user.token})
    //     console.log('the body----->', responce.body)
        // expect(responce.statusCode).toBe(200);
        // expect(responce.body.entry).toHaveProperty('entry')
        // expect(responce.body.entry).toHaveProperty('date')
        // expect(responce.body.entry).toHaveProperty('prompt')
        // expect(responce.body.entry).toHaveProperty('inspiration')
        // expect(responce.body.entry).toHaveProperty('emotions')
        // expect(responce.body.entry).toHaveProperty('joy')
        // expect(responce.body.entry).toHaveProperty('surprise')
        // expect(responce.body.entry).toHaveProperty('trust')
    // })

    test("get a month of user entries", async function() {

        const responce = await request(app)
        .get(`/diaries/${testData.user.username}/month/2021-03-02`)
        .send({ _token: testData.user.token})

        console.log(responce.body)
    })


})
