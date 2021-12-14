const service = require('../service/comments.service');

exports.saveComment = async (req, res) => {
  try {
    const newComment = await service.saveComment(req.body);
    res.status(200).json(newComment);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getAll = async (req, res) => {
  try {
    const comments = await service.getAll();
    res.status(200).json(comments);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getById = async (req, res) => {
  try {
    const comment = await service.getCommentById(req.params.id)
    res.status(200).json(comment);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getUserByCommentId = async (req, res) => {
  try {
    const user = await service.getUserByCommentId(req.params.id)
    res.status(200).json(user);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.getPostByCommentId = async (req, res) => {
  try {
    const post = await service.getPostByCommentId(req.params.id)
    res.status(200).json(post);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.updateById = async (req, res) => {
  try {
    const updatedComment = await service.updateCommentById(req.params.id, req.body)
    res.status(200).json(updatedComment);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
exports.deleteById = async (req, res) => {
  try {
    const deletedComment = await service.deleteByCommentId(req.params.id)
    res.status(200).json(deletedComment);
  }
  catch (error) {
    res.status(400).json({error : error.message});
  }
}
