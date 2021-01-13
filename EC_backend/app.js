const express = require('express');
const ExpressError = require('./helpers/expressError');

const app = express();

const userRoutes = require('./routes/users');
// const promptRoutes = require('./routes/prompts');
// const adviceRoutes = require('./routes/advice');
const diaryRoutes = require('./routes/diaries');
const loginRoute = require('./routes/login');
const adminRoute = require('./routes/admin');

app.use(express.json());

app.use("/users", userRoutes);
// app.use("/prompts", promptRoutes);
// app.use("/advice", adviceRoutes);
app.use("./diaries", diaryRoutes);
app.use("./", loginRoute);
app.use("/admin", adminRoute)

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