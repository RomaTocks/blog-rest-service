import postRepository from '../repository/posts.memory.repository';
import commentRepository from '../repository/comments.memory.repository';
import usersRepository from '../repository/user.memory.repository';
import User from '../model/user.model';
import Comment from '../model/comments.model';
import Post from '../model/posts.model';
import { RequestError } from '../error/request.error';

const getAll = async () => commentRepository.getAll()

const getCommentById = async (id : string) => {
  if(id.length !== 36) {
    throw new RequestError(400,'Bad ID format.')
  }
  return commentRepository.getById(id);
}

const getPostByCommentId = async (id : string) => {
  if(id.length !== 36) {
    throw new RequestError(400,'Bad ID format.')
  }
  const postComment = await commentRepository.getById(id);
  if(!postComment) throw new RequestError(400,`Comment with ID:${  id  } not found!`)
  const post = await postRepository.getPostById(postComment.post.id);
  if(!post) throw new RequestError(400,`Post with comment ID:${  id  } not found!`)
  commentRepository.getByPostId(postComment.post.id).then(value => {
    post.comments = value;
  })
  return post;
}
const getUserByCommentId = async (id : string) => {
  if(id.length !== 36) {
    throw new RequestError(400,'Bad ID format.')
  }
  const userComment = await commentRepository.getById(id);
  if(!userComment) throw new RequestError(400,`Comment with ID:${  id  } not found!`);
  const user = await usersRepository.getById(userComment.user.id);
  if(!user) throw new RequestError(400,`User with comment ID:${  id  } not found!`);
  postRepository.getPostsByUserId(user.id).then(value => {
    user.posts = value;
  });
  commentRepository.getByUserId(user.id).then(value => {
    user.comments = value;
  });
  return User.toResponse(user);
}
const saveComment = async (newComment: {text : string, post: Post, user: User}) => {
  if(!newComment.text || !newComment.post.id || !newComment.user.id) throw new RequestError(400,'Bad credentials!');
  const savedComment = await commentRepository.save(newComment);
  return savedComment;
}
const updateCommentById = async (id:string, updatableComment: Comment) => {
  if(id.length !== 36) {
    throw new RequestError(400,'Bad ID format.')
  }
  const updatedComment = commentRepository.updateById(id, updatableComment);
  if(!updatedComment) throw new RequestError(400,`Comment with ID:${  id  } not found!`)
  return updatedComment;
}
const deleteByCommentId = async (id:string) => {
  if(id.length !== 36) {
    throw new RequestError(400,'Bad ID format.')
  }
  const deletedComment = await commentRepository.deleteById(id)
  if(!deletedComment) throw new RequestError(400,`Comment with ID:${  id  } not found!`);
  return deletedComment;
}
module.exports = { getAll, getCommentById, getPostByCommentId, getUserByCommentId, saveComment, updateCommentById, deleteByCommentId };
