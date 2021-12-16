import express, { NextFunction, Request, Response } from 'express';
import userRouter from './router/user.router';
import postRouter from './router/posts.router';
import commentRouter from './router/comments.router';
import notFoundRouter from './router/not-found.router'
import { loggerMiddleware } from './middlewares';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(loggerMiddleware);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use(notFoundRouter)

export default app
