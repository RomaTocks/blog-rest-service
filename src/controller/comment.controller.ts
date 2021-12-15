import { Request, Response } from 'express';

const service = require('../service/comments.service');

const saveComment = async (req : Request, res : Response) => {
  try {
    const newComment = await service.saveComment(req.body);
    res.status(200).json(newComment);
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getAll = async (_req : Request, res : Response) => {
  try {
    const comments = await service.getAll();
    res.status(200).json(comments);
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const comment = await service.getCommentById(req.params['id'])
      res.status(200).json(comment);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getUserByCommentId = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const user = await service.getUserByCommentId(req.params['id'])
      res.status(200).json(user);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getPostByCommentId = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const post = await service.getPostByCommentId(req.params['id'])
      res.status(200).json(post);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const updateById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const updatedComment = await service.updateCommentById(req.params['id'], req.body)
      res.status(200).json(updatedComment);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const deleteById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const deletedComment = await service.deleteByCommentId(req.params['id'])
      res.status(200).json(deletedComment);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
export default {getAll, getById, deleteById, updateById, getPostByCommentId, saveComment, getUserByCommentId}
