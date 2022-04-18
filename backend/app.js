const express = require('express');
const { json } = require('stream/consumers');
const bodyParser = require('body-parser');
const app = express();

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

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log('$ New post: ', post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    // res.send('Hello from express!');
    const posts = [{
        id: 'id1',
        title: 'Server side post',
        content: 'server side content'
    },
    {
        id: 'id2',
        title: 'Another server side post',
        content: 'Another server side content'
    }];
    res.status(200).json({
        message: 'server message for complexity',
        posts: posts
    });
});

module.exports = app;