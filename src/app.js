const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);
app.use("/", (req, res) => {
    res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;