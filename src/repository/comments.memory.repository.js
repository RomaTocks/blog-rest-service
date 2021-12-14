const Comment = require("../model/comments.model")

const comments = [
  {
    id : 'e24fgfgbd0-2dd8-4501-8133-35033ce3b7e0',
    text : 'wow!',
    post : {
      id :'226b0228-2ba6-4ec4-80bf-f07f88920a7d'
    },
    user : {
      id: "204aef92-f819-421f-b753-7dd96620c0c3"
    }
  }

];
const getAll = async () => comments
const getById = async (id) => comments.find(comment => comment.id === id)
const save = async (comment) => {
  const newComment = new Comment(comment);
  comments.push(newComment);
  return newComment;
} 
const updateById = async(id, updatableComment) => {
  const index = comments.findIndex(comment => comment.id === id);
  const oldComment = comments.find(comment => comment.id === id);
  if(updatableComment.name !== undefined) oldComment.text = updatableComment.text;
  comments.splice(index, 1, oldComment);
}
const getByUserId = async(id) => {
  const userComments = comments.filter(comment => comment.user.id === id);
  return userComments;
}
const getByPostId = async(id) => {
  const postComments = comments.filter(comment => comment.post.id === id);
  return postComments;
}
const deleteByPostId = async(id) => {
  const postComments = comments.filter(comment => comment.post.id === id);
  if(postComments) {
    const deletedPostComments = new Array(postComments);
    deletedPostComments.forEach(element => {
      const index = comments.findIndex(comment => comment.id === element.id);
      comments.splice(index, 1);
    });
  }
  return postComments;
}
const deleteByUserId = async(id) => {
  const userComments = comments.filter(comment => comment.user.id === id);
  if(userComments) {
    const deletedComments = new Array(userComments);
    deletedComments.forEach(element => {
      const index = comments.findIndex(comment => comment.id === element.id);
      comments.splice(index, 1);
    });
  }
  return userComments;
}
const deleteById = async(id) => {
  const deletableComment = comments.find(comment => comment.id === id);
  const index = comments.findIndex(comment => comment.id === id);
  comments.splice(index, 1);
  return deletableComment;
}
module.exports = { getAll, getByUserId, updateById, save, getById, deleteById, deleteByUserId, getByPostId, deleteByPostId };
