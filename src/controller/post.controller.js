const service = require('../service/posts.service');

exports.savePost = async (req, res) => {
  try {
    const newPost = await  service.savePost(req.body);
    res.status(200).json(newPost);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getAll = async (req, res) => {
  try {
    const posts = await service.getAll();
    res.status(200).json(posts);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getById = async (req, res) => {
  try {
    const post = await service.getPostById(req.params.id);
    res.status(200).json(post);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getPostCommentsById = async (req, res) => {
  try {
    const comments = await service.getPostCommentsById(req.params.id);
    res.status(200).json(comments);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getUserByPostId = async (req,res) => {
  try {
    const user = await service.getUserByPostId(req.params.id);
    res.status(200).json(user);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.updatePostById = async (req, res) => {
  try {
    const updatedPost = await service.updatePostById(req.params.id, req.body);
    res.status(200).json(updatedPost);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.deleteById = async (req, res) => {
  try {
    const deletedPost = await service.deletePostById(req.params.id);
    res.status(200).json(deletedPost);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}