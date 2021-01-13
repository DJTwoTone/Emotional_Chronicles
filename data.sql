-- \c
-- emo-chron

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS prompts_list;
DROP TABLE IF EXISTS emotions_list;
DROP TABLE IF EXISTS diary_entries;
DROP TABLE IF EXISTS entries_list_emotions;
DROP TABLE IF EXISTS inspirations;

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
    prompt TEXT NOT NULL
);

CREATE TABLE emotions_list
(
    id SERIAL PRIMARY KEY,
    emotion TEXT
);

CREATE TABLE diary_entries
(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    entry TEXT NOT NULL,
    entered DATE,
    joy FLOAT,
    no_emotion FLOAT,
    saddness FLOAT,
    fear FLOAT,
    surprise FLOAT,
    anger FLOAT,
    disgust FLOAT

);

CREATE TABLE entries_list_emotions
(
    emotion_id INTEGER NOT NULL REFERENCES emotions_list,
    diary_entry_id INTEGER NOT NULL REFERENCES diary_entries,
    PRIMARY KEY(emotion_id, diary_entry_id)

);

CREATE TABLE inspirations
(
    id SERIAL PRIMARY KEY,
    inspiration TEXT NOT NULL,
    flagged BOOLEAN DEFAULT FALSE
)

-- do something with time and timezones