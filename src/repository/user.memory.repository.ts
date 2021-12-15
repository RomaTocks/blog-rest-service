import User from '../model/user.model';

const users : User[] = [
  {
    id: "204aef92-f819-421f-b753-7dd96620c0c3",
    name: "random",
    login: "useany",
    password: "2eer",
    posts : [],
    comments : []
  }
];

const getAll = async () => users

const getById = async (id: string) => users.find(user => user.id === id)

const save = async (newUser: { name: string; login: string; password: string;}) => {
  const user = new User(newUser);
  users.push(user);
  return user;
}
const updateById = async(id : string, updateUser : User) => {
  const index = users.findIndex(user => user.id === id);
  const oldUser = users.find(user => user.id === id);
  if(updateUser.name !== undefined && oldUser) oldUser.name = updateUser.name;
  if(updateUser.login !== undefined && oldUser) oldUser.login = updateUser.login;
  if(updateUser.password !== undefined && oldUser) oldUser.password = updateUser.password;
  if(oldUser) users.splice(index,1,oldUser);
  return oldUser;
}
const deleteById = async(id : string) => {
  const index = users.findIndex(user => user.id === id);
  const deletedUser = users.find(user => user.id === id);
  users.splice(index, 1);
  return deletedUser;
}
export default { getAll, save, deleteById, getById, updateById };
