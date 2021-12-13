const User = require("../model/user.model");

const users = [
  {
    id: "204aef92-f819-421f-b753-7dd96620c0c3",
    name: "random",
    login: "useany",
    password: "2eer",
    posts: [],
    comments: []
  }
];

const getAll = async () => users

const getById = async (id) => users.find(user => user.id === id)

const save = async (newUser) => {
  users.push(new User(newUser));
  return newUser;
}
const updateById = async(id, updateUser) => {
  const index = users.findIndex(user => user.id === id);
  const oldUser = users.find(user => user.id === id);
  if(updateUser.name !== undefined) oldUser.name = updateUser.name;
  if(updateUser.login !== undefined) oldUser.login = updateUser.login;
  if(updateUser.password !== undefined) oldUser.password = updateUser.password;
  if(updateUser.posts !== undefined) oldUser.posts = updateUser.posts;
  users.splice(index,1,oldUser);
  return oldUser;
}
const deleteById = async(id) => {
  const index = users.findIndex(user => user.id === id);
  const deletedUser = users.find(user => user.id === id);
  users.splice(index, 1);
  return deletedUser;
}
module.exports = { getAll, save, deleteById, getById, updateById };
