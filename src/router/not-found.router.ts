import { Router,Request, Response } from 'express';
import { errorLogger } from '../middlewares/logger';
import { RequestError } from '../error/request.error';

const router = Router();

router.route('/*')
  .all((req : Request, res : Response) => {
    const error = new RequestError(404,'Resource not found!');
    res.status(error.status).json({error : error.message});
    errorLogger(req, error)
  })

export default router;