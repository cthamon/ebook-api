const express = require('express');

const userRoutes = require('./userRoutes');
const novelRoutes = require('./novelRoutes');
const episodeRoutes = require('./episodeRoutes');

const app = express();

app.use("/user", userRoutes);
app.use("/novel", novelRoutes);
app.use("/episode", episodeRoutes);

module.exports = app;