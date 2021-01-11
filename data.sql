CREATE TABLE users
(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT
)

CREATE TABLE prompts_list
(
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL
)

CREATE TABLE emotions_list
(
    id SERIAL PRIMARY KEY,
    emotion TEXT
)

CREATE TABLE diary_entries
(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    entry TEXT NOT NULL,
    entered DATE DEFAULT current_date,
    -- user_emotions
    joy FLOAT,
    no_emotion FLOAT,
    saddness FLOAT,
    fear FLOAT,
    surprise FLOAT,
    anger FLOAT,
    disgust FLOAT

)

CREATE TABLE entry_emotions(
    
)
