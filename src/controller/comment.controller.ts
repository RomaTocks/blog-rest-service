import { Request, Response } from 'express';
import { handleError } from '../error/errors.service';

const service = require('../service/comments.service');

const saveComment = async (req : Request, res : Response) => {
  try {
    const newComment = await service.saveComment(req.body);
    res.status(200).json(newComment);
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getAll = async (req : Request, res : Response) => {
  try {
    const comments = await service.getAll();
    res.status(200).json(comments);
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const comment = await service.getCommentById(req.params['id'])
      res.status(200).json(comment);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getUserByCommentId = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const user = await service.getUserByCommentId(req.params['id'])
      res.status(200).json(user);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getPostByCommentId = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const post = await service.getPostByCommentId(req.params['id'])
      res.status(200).json(post);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const updateById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const updatedComment = await service.updateCommentById(req.params['id'], req.body)
      res.status(200).json(updatedComment);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const deleteById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const deletedComment = await service.deleteByCommentId(req.params['id'])
      res.status(200).json(deletedComment);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
export default {getAll, getById, deleteById, updateById, getPostByCommentId, saveComment, getUserByCommentId}
