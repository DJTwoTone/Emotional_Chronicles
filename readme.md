# Emotional Chronicles



> Emotional Chronicles is a simple diary app that uses a emotional analysis service to help user keep track of their emotional state.

>It has a CRUD backend written in Express, and a React frontend currently using Bootstrap for styling.

> This project was built as a capstone project for the Springboard Software Engineering program

## Getting Started

Before you get started, there are a few things that you'll need to have installed on your system.

- PostgreSQL server (make sure you have this setup for your preferences)
- Node 

### Prerequisites

Most of the libraries you need will be installed from the package.json files, but:

- You will need an API key from for emotion analysis API [Symanto](https://api.symanto.net). You will need to setup a .env file and include it API_KEY=whatever_your_API_key_is


## Installing



### Setup the Databases

> Make sure you have PostgreSQL all setup as you like it

From the root directory
```
createdb emo-chron
createdb emo-chron-test

psql emo-chron < data.psql
psql emo-chron-test < testing-data.psql
```

> NOTE* The resources that were used to seed the databases can be found in the resource_collection folder 

### Install the Backend

```
cd EC_backend
npm install
```

### Install the Frontend

```
cd emo_chron_frontend
npm test
```

Those should get you going

## Running Tests

There are currently tests for both the backend and the frontend. These tests will continue to be developed to better ensure quality in the code base. 



### Backend Tests

Go into the backend folder (EC_backend)
There is a script set up.
All the tests can currently be found in the "__tests__" folder.

```
cd EC_backend
npm test
```

### Frontend Tests

Go into the backend folder (emo_chron_frontend)
There is a script set up.
All the tests can currently be found in the "src" folder right under the components they are testing.

```
cd emo_chron_frontend
npm test
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Code Owners

* **Benjamin W. Slater** - *I did this but nothing is done isolation. I stand on the shoulders of giants.* - [Here is my github](https://github.com/DJTwoTone)

## Acknowledgments

* My mentor - Jim Rudolf (Without his advice and gentle prodding, I would be stuck staring at my computer screen still)
* My wife - Miyeong Jung (For putting up with me for all these years and believing that this coding thing is something I can do)
* Everyone else who has given me little pushes and showed interest in what I'm doing.


## Possible Future Additions

- There is a much better emotional analysis service, but it cost cold hard cash. It could be implemented in the future is this project were to take a commercial turn (I doubt it, but you never know)
- The UI needs a lot of work. I'm waiting patiently for my expert to take a whack at it.
- TESTING, TESTING, TESTING

## License

MIT License

Copyright (c) [2020] [Benjamin W Slater]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

