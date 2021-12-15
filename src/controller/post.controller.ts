import { Request, Response } from 'express';

import service from '../service/posts.service';

const savePost = async (req : Request, res : Response) => {
  try {
    const newPost = await  service.savePost(req.body);
    res.status(200).json(newPost);
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getAll = async (_req : Request, res : Response) => {
  try {
    const posts = await service.getAll();
    res.status(200).json(posts);
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const post = await service.getPostById(req.params['id']);
      res.status(200).json(post);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getPostCommentsById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const comments = await service.getPostCommentsById(req.params['id']);
      res.status(200).json(comments);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const getUserByPostId = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const user = await service.getUserByPostId(req.params['id']);
      res.status(200).json(user);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const updatePostById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const updatedPost = await service.updatePostById(req.params['id'], req.body);
      res.status(200).json(updatedPost);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
const deleteById = async (req : Request, res : Response) => {
  try {
    if(req.params['id'] !== undefined) {
      const deletedPost = await service.deletePostById(req.params['id']);
      res.status(200).json(deletedPost);
    }
  }
  catch ({ message }) {
    res.status(400).json({error : message});
  }
}
export default {deleteById,getById, getAll, getPostCommentsById, updatePostById, savePost, getUserByPostId, }