const Post = require("../model/posts.model");

const posts = [
  {
    id :'226b0228-2ba6-4ec4-80bf-f07f88920a7d',
    title : 'Breaking',
    text : 'Graphic card so expensive!',
    user : {
      id : 'e2404bd0-2dd8-4501-8133-35033ce3b7e0'
    }
  }
  ,
  {
    id :'226b0228-2bab-4ec4-80bf-f07f88920a7d',
    title : 'Delete me!',
    text : 'please!',
    user : {
      id: "204aef92-f819-421f-b753-7dd96620c0c3"
    }
  }
];
const getAll = async () => posts

const save = async (newPost) => {
  const savedPost = new Post(newPost);
  posts.push(savedPost);
  return savedPost;
}
const getPostById = async(id) => posts.find(post => post.id === id)

const getPostsByUserId = async(id) => posts.find(post => post.user.id === id)

const updatePostById = async(id, updatedPost) => {
  const index = posts.findIndex(post => post.id === id);
  const oldPost = posts.find(post => post.id === id);
  if(updatedPost.title !== undefined) oldPost.title = updatedPost.title;
  if(updatedPost.text !== undefined) oldPost.text = updatedPost.text;
  posts.splice(index,1,oldPost);
  return oldPost;
}
const deleteById = async(id) => {
  const index = posts.findIndex(post => post.id === id);
  const deletedPost = posts.find(post => post.id === id);
  posts.splice(index, 1);
  return deletedPost;
}
const deleteByUserId = async(id) => {
  const userPosts = posts.find(post => post.user.id === id);
  if(userPosts) {
    const deletedPosts = new Array(userPosts);
    deletedPosts.map(element => {
      const index = posts.findIndex(post => post.id === element.id);
      posts.splice(index, 1);
      return element;
    });
  }
  return userPosts;
}
module.exports = { getAll, save, getPostsByUserId, updatePostById, deleteById, getPostById, deleteByUserId };
