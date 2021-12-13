const postRepository = require('../repository/posts.memory.repository')
const commentRepository = require('../repository/comments.memory.repository')
const usersRepository = require('../repository/user.memory.repository');
const User = require("../model/user.model");

const getAll = async () => commentRepository.getAll()

const getCommentById = async (id) => {
  if(id.length !== 36) {
    throw new Error('Bad ID format.')
  }
  return commentRepository.getById(id);
}

const getPostByCommentId = async (id) => {
  if(id.length !== 36) {
    throw new Error('Bad ID format.')
  }
  const postComment = await commentRepository.getById(id);
  if(!postComment) throw new Error(`Comment with ID:${  id  } not found!`)
  const post = await postRepository.getPostById(postComment.post.id);
  if(!post) throw new Error(`Post with comment ID:${  id  } not found!`)
  commentRepository.getByPostId(postComment.post.id).then(value => {
    post.comments = value;
  })
  return post;
}
const getUserByCommentId = async (id) => {
  if(id.length !== 36) {
    throw new Error('Bad ID format.')
  }
  const userComment = await commentRepository.getById(id);
  if(!userComment) throw new Error(`Comment with ID:${  id  } not found!`);
  const user = await usersRepository.getById(userComment.user.id);
  if(!user) throw new Error(`User with comment ID:${  id  } not found!`);
  postRepository.getPostsByUserId(user.id).then(value => {
    user.posts = value;
  });
  commentRepository.getByUserId(user.id).then(value => {
    user.comments = value;
  });
  return User.toResponse(user);
}
const saveComment = async (newComment) => {
  if(!newComment.text || !newComment.post.id || !newComment.user.id) throw new Error('Bad credentials!');
  const savedComment = await commentRepository.save(newComment);
  return savedComment;
}
const updateCommentById = async (id, updatableComment) => {
  if(id.length !== 36) {
    throw new Error('Bad ID format.')
  }
  const updatedComment = commentRepository.updateById(id, updatableComment);
  if(!updatedComment) throw new Error(`Comment with ID:${  id  } not found!`)
  return updatedComment;
}
const deleteByCommentId = async (id) => {
  if(id.length !== 36) {
    throw new Error('Bad ID format.')
  }
  const deletedComment = await commentRepository.deleteById()
  if(!deletedComment) throw new Error(`Comment with ID:${  id  } not found!`);
  return deletedComment;
}
module.exports = { getAll, getCommentById, getPostByCommentId, getUserByCommentId, saveComment, updateCommentById, deleteByCommentId };
