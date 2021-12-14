const express = require('express');
const userRouter = require('./router/user.router')
const postRouter = require('./router/posts.router')
const commentRouter = require('./router/comments.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

module.exports = app;
