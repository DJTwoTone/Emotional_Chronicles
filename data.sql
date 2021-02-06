-- DROP DATABASE IF EXISTS "emo-chron"
-- WITH
-- (FORCE);

-- CREATE DATABASE "emo-chron";

-- \c
-- "emo-chron"

DROP TABLE prompts_list;
DROP TABLE entries_list_emotions;
DROP TABLE emotions_list;
DROP TABLE diary_entries;
DROP TABLE users;
DROP TABLE inspirations;

CREATE TABLE users
(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    is_admin BOOLEAN NOT NULL default FALSE
);

CREATE TABLE prompts_list
(
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL,
    flagged BOOLEAN DEFAULT TRUE
);

CREATE TABLE emotions_list
(
    emotion TEXT PRIMARY KEY
);

CREATE TABLE diary_entries
(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    entry TEXT NOT NULL,
    date DATE,
    joy FLOAT,
    no_emotion FLOAT,
    sadness FLOAT,
    fear FLOAT,
    surprise FLOAT,
    anger FLOAT,
    disgust FLOAT

);


CREATE TABLE entries_list_emotions
(
    emotion TEXT NOT NULL REFERENCES emotions_list ON DELETE CASCADE,
    diary_entry_id INTEGER NOT NULL REFERENCES diary_entries ON DELETE CASCADE,
    PRIMARY KEY(emotion, diary_entry_id)

);

CREATE TABLE inspirations
(
    id SERIAL PRIMARY KEY,
    inspiration TEXT NOT NULL,
    flagged BOOLEAN DEFAULT TRUE
);

-- password should be 'password'

INSERT INTO users
    (username, password, first_name, last_name, email, is_admin)
VALUES
    ('testuser', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Bob', 'Testface', 'test@test.com', FALSE),
    ('testadmin', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Big Bob', 'Adminface', 'admin@test.com', TRUE);


INSERT INTO prompts_list
    (prompt, flagged)
VALUES
    ('What is your number one goal this year?', FALSE),
    ('What are you most grateful for?', FALSE),
    ('Are you content?', FALSE),
    ('What is your best memory of last year?', FALSE),
    ('What was the last major accomplishment you had?', FALSE),
    ('What possession could you not live without?', FALSE),
    ('Can people change?', FALSE),
    ('What is the last “good” thing you ate?', FALSE);


INSERT INTO emotions_list
    (emotion)
VALUES
    ('afraid'),
    ('agitated'),
    ('alarmed'),
    ('antsy'),
    ('anxious');

INSERT INTO inspirations
    (inspiration, flagged)
VALUES
    ('“All our dreams can come true, if we have the courage to pursue them.” – Walt Disney', FALSE),
    ('“The secret of getting ahead is getting started.” – Mark Twain', FALSE),
    ('“I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed.” – Michael Jordan', FALSE)



