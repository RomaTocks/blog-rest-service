const service = require('../service/user.service')
const User = require('../model/user.model');

exports.saveUser = async (req, res) => {
    try {
        const newUser = await service.saveUser(req.body);
        res.status(200).json(newUser);
    }catch(e) {
        res.status(400).json({error : e.message});
    }
}
exports.getAll = async (req, res) => {
    const users = await service.getAll();
    res.json(users.map(user => User.toResponse(user)));
}
exports.getById = async (req, res) => {
    try {
      const user = await service.getUserById(req.params.id)
      res.json(User.toResponse(user))
    }
    catch(error) {
      res.status(400).json({error : error.message})
    }
}
exports.updateById = async (req, res) => {
    try {
        const user = await service.updateById(req.params.id, req.body)
        res.json(User.toResponse(user))
    }
    catch(error) {
        res.status(400).json({error : error.message})
    }
}
exports.deleteById = async (req, res) => {
    try {
        const user = await service.deleteUserById(req.params.id)
        res.json(User.toResponse(user))
    }
    catch(error) {
        res.status(400).json({error : error.message})
    }
}
exports.getPostsById = async (req, res) => {
    try {
        const posts = await service.getUserPosts(req.params.id)
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).json({error : error.message});
    }
}
exports.getCommentsById = async (req, res) => {
    try {
        const comments = await service.getUserComments(req.params.id)
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(400).json({error : error.message});
    }
}
    