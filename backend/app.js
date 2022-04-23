const express = require('express');
const app = express();
const { json } = require('stream/consumers');
const bodyParser = require('body-parser');
const Post = require('./models/post');
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

app.get('/api/posts', (req, res, next) => {
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


app.get('/api/posts/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post not found!' });
            }
        })
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });
});

app.put('/api/posts/:id', (req, res, next) => { // 
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    Post.updateOne({ _id: req.params.id }, post)
        .then(result => {
            console.log('$ app updateOne result: ', result);

            res.status(200).json({
                message: 'Post updated succefully'
            });
        });
});

app.delete('/api/posts/:id', (req, res, next) => { // 
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log('$ app deleteOne result: ', result);

        res.status(200).json({
            message: 'Post deleted succefully'
        });
    });
});

module.exports = app;