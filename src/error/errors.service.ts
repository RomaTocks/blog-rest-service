import { Request, Response } from 'express';
import { RequestError } from './request.error';
import { errorLogger } from '../middlewares/logger';

export function handleError(error : unknown, req : Request, res: Response) {
  if(error instanceof RequestError) {
    res.status(error.status).json({error : error.message});
    errorLogger(req, error);
  }
  else {
    const internalError = {status : 500, message : 'Internal server error.'}
    res.status(500).json({error : internalError.message})
    errorLogger(req, internalError)
  }
}