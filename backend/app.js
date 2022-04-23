const express = require('express');
const app = express();

const { json } = require('stream/consumers');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');

const mongoose = require('mongoose');
const user ='';
const mongoPass = '';
const mongoDb = '';


mongoose.connect(`mongodb+srv://${user}:${mongoPass}@cluster0.kqwa5.mongodb.net/${mongoDb}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to Mongo DB');
    }).catch((err) => {
        console.log('Connection error: ', err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // redundant

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    next();
});

app.use('/api/posts', postRoutes);

module.exports = app;   