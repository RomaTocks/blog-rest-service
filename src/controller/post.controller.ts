import { Request, Response } from 'express';

import service from '../service/posts.service';
import { handleError } from '../error/errors.service';

const savePost = async (req : Request, res : Response) => {
  try {
    const newPost = await  service.savePost(req.body);
    res.status(200).json(newPost);
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getAll = async (req : Request, res : Response) => {
  try {
    const posts = await service.getAll();
    res.status(200).json(posts);
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const post = await service.getPostById(req.params['id']);
      res.status(200).json(post);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getPostCommentsById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const comments = await service.getPostCommentsById(req.params['id']);
      res.status(200).json(comments);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const getUserByPostId = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const user = await service.getUserByPostId(req.params['id']);
      res.status(200).json(user);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const updatePostById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const updatedPost = await service.updatePostById(req.params['id'], req.body);
      res.status(200).json(updatedPost);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
const deleteById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const deletedPost = await service.deletePostById(req.params['id']);
      res.status(200).json(deletedPost);
    }
  }
  catch (error) {
    handleError(error,req,res);
  }
}
export default {deleteById,getById, getAll, getPostCommentsById, updatePostById, savePost, getUserByPostId, }