const express = require('express');
const { json } = require('stream/consumers');

const app = express();

// app.use((req, res, next) => {
//     next();
// });

app.use('/api/posts', (req, res, next) => {
    // res.send('Hello from express!');
    const posts = [{
        id: 'id1',
        title: 'Server side post',
        content: 'server sidce content'
    },
    {
        id: 'id2',
        title: 'Another server side post',
        content: 'Another server sidce content'
    }];
    res.status(200).json({
        message: 'server message for complexity',
        posts: posts
    });
});

module.exports = app;