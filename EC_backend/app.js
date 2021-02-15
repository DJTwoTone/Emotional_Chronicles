const express = require('express');
const ExpressError = require('./helpers/expressError');


const userRoutes = require('./routes/users');
const diaryRoutes = require('./routes/diary');
// const resourcesRoutes = require('./routes/resources')
const emotionsRoutes = require('./routes/emotions')
const promptsRoutes = require('./routes/prompts')
const inspirationsRoutes = require('./routes/inspirations')
const loginRoute = require('./routes/login');

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/diaries", diaryRoutes);
// app.use("/resources", resourcesRoutes);
app.use("/emotions", emotionsRoutes);
app.use("/prompts", promptsRoutes);
app.use("/inspirations", inspirationsRoutes)
app.use("/", loginRoute);

app.use(function(req, res, next) {
    const err = new ExpressError("Not found", 404);

    return next(err);
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);

    return res.json({
        status: err.status,
        message: err.message
    });
});


module.exports = app;