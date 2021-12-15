import Post from '../model/posts.model';
import User from '../model/user.model';

const posts : Post[] = [
  {
    id :'226b0228-2ba6-4ec4-80bf-f07f88920a7d',
    title : 'Breaking',
    text : 'Graphic card so expensive!',
    user : {
      id : '204aef92-f819-421f-b753-7dd96620c0c3'
    },
    comments:[]
  }
  ,
  {
    id :'226b0228-2bab-4ec4-80bf-f07f88920a7d',
    title : 'Delete me!',
    text : 'please!',
    user : {
      id: "204aef92-f819-421f-b753-7dd96620c0c3"
    },
    comments:[]
  }
];
const getAll = async () => posts

const save = async (newPost: {title:string,text:string,user:User}) => {
  const savedPost = new Post(newPost);
  posts.push(savedPost);
  return savedPost;
}
const getPostById = async(id : string) => posts.find(post => post.id === id)

const getPostsByUserId = async(id : string) => posts.filter(post => post.user.id === id)

const updatePostById = async(id : string, updatedPost : Post) => {
  const index = posts.findIndex(post => post.id === id);
  const oldPost = posts.find(post => post.id === id);
  if(updatedPost.title !== undefined && oldPost) oldPost.title = updatedPost.title;
  if(updatedPost.text !== undefined && oldPost) oldPost.text = updatedPost.text;
  if(oldPost) posts.splice(index,1,oldPost);
  return oldPost;
}
const deleteById = async(id : string) => {
  const index = posts.findIndex(post => post.id === id);
  const deletedPost = posts.find(post => post.id === id);
  posts.splice(index, 1);
  return deletedPost;
}
const deleteByUserId = async(id : string) => {
  const userPosts = posts.filter(post => post.user.id === id);
    userPosts.map(element => {
      const index = posts.findIndex(post => post.id === element.id);
      posts.splice(index, 1);
      return element;
    });
  return userPosts;
}
export default { getAll, save, getPostsByUserId, updatePostById, deleteById, getPostById, deleteByUserId };
