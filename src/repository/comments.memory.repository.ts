import Comment from '../model/comments.model';
import Post from '../model/posts.model';
import User from '../model/user.model';

const comments : Comment[] = [
  {
    id : 'e24fgfgbd0-2dd8-4501-8133-35033ce3b7e0',
    text : 'wow!',
    post : {
      id :'226b0228-2ba6-4ec4-80bf-f07f88920a7d',
      user : {
        id: "204aef92-f819-421f-b753-7dd96620c0c3"
      }
    },
    user : {
      id: "204aef92-f819-421f-b753-7dd96620c0c3"
    }
  }

];
const getAll = async () => comments
const getById = async (id : string) => comments.find(comment => comment.id === id)
const save = async (comment : {text:string, post:Post,user:User}) => {
  const newComment = new Comment(comment);
  comments.push(newComment);
  return newComment;
} 
const updateById = async(id : string, updatableComment : Comment) => {
  const index = comments.findIndex(comment => comment.id === id);
  const oldComment = comments.find(comment => comment.id === id);
  if(updatableComment.text !== undefined && oldComment) oldComment.text = updatableComment.text;
  if(oldComment) comments.splice(index, 1, oldComment);
}
const getByUserId = async(id : string) => {
  const userComments = comments.filter(comment => {
    if(comment.user) return comment.user.id === id;
    return null
  });
  return userComments;
}
const getByPostId = async(id : string) => {
  const postComments = comments.filter(comment => {
    if(comment.post) return comment.post.id === id;
    return null;
  });
  return postComments;
}
const deleteByPostId = async(id : string) => {
  const postComments = comments.filter(comment => {
    if(comment.post) return comment.post.id === id;
    return null
  });
    postComments.forEach(element => {
      const index = comments.findIndex(comment => comment.id === element.id);
      comments.splice(index, 1);
    });
  return postComments;
}
const deleteByUserId = async(id : string) => {
  const userComments = comments.filter(comment => {
    if(comment.user) return comment.user.id === id;
    return null;
  });
    userComments.forEach(element => {
      const index = comments.findIndex(comment => comment.id === element.id);
      comments.splice(index, 1);
    });
  return userComments;
}
const deleteById = async(id : string) => {
  const deletableComment = comments.find(comment => comment.id === id);
  const index = comments.findIndex(comment => comment.id === id);
  comments.splice(index, 1);
  return deletableComment;
}
export default { getAll, getByUserId, updateById, save, getById, deleteById, deleteByUserId, getByPostId, deleteByPostId };
