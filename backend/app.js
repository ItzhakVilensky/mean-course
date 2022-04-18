const express = require('express');
const { json } = require('stream/consumers');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    next();
});

app.use('/api/posts', (req, res, next) => {
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