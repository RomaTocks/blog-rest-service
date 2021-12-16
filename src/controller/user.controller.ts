import { Request, Response } from 'express';
import service from '../service/user.service';
import User from '../model/user.model';
import { handleError } from '../error/errors.service';

const saveUser = async (req : Request, res : Response) => {
    try {
        const newUser  = await service.saveUser(req.body);
        res.status(200).json(newUser);
    }catch(error) {
        handleError(error,req,res);
    }
}
const getAll = async (_req : Request, res : Response) => {
    const users : User[] = await service.getAll();
    res.json(users.map(user => User.toResponse(user)));
}
const getById = async (req : Request, res : Response) => {
    try {
        if(req.params['id'] !== undefined) {
            const user = await service.getUserById(req.params['id'])
            res.json(User.toResponse(user))
        }
    }
    catch(error) {
        handleError(error,req,res);
    }
}
const updateById = async (req : Request, res : Response) => {
    try {
        if(req.params['id'] !== undefined) {
            const user = await service.updateUserById(req.params['id'], req.body)
            res.json(user ? User.toResponse(user) : null)
        }
    }
    catch(error) {
        handleError(error,req,res);
    }
}
const deleteById = async (req : Request, res : Response) => {
    try {
        if(req.params['id'] !== undefined) {
            const user = await service.deleteUserById(req.params['id'])
            res.json(User.toResponse(user))
        }
    }
    catch(error) {
        handleError(error,req,res);
    }
}
const getPostsById = async (req : Request, res : Response) => {
    try {
        if(req.params['id'] !== undefined) {
            const posts = await service.getUserPosts(req.params['id'])
            res.status(200).json(posts);
        }
    }
    catch (error) {
        handleError(error,req,res);
    }
}
const getCommentsById = async (req : Request, res : Response) => {
    try {
        if(req.params['id'] !== undefined) {
            const comments = await service.getUserComments(req.params['id'])
            res.status(200).json(comments);
        }
    }
    catch (error) {
        handleError(error,req,res);
    }
}
export default {saveUser, getCommentsById, getPostsById, getAll, deleteById, getById, updateById}
    