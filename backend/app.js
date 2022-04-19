const express = require('express');
const app = express();
const { json } = require('stream/consumers');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://itzhak83:1a2s3d4F@cluster0.kqwa5.mongodb.net/node-angular?retryWrites=true&w=majority')
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

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save();

    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    // res.send('Hello from express!');
    // const posts = [{
    //     id: 'id1',
    //     title: 'Server side post',
    //     content: 'server side content'
    // },
    // {
    //     id: 'id2',
    //     title: 'Another server side post',
    //     content: 'Another server side content'
    // }];

    Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched succefully',
            posts: documents
        });
    }).catch((err) => {
        console.log('$ Post.find error: ', err);
    });

   
});

module.exports = app;