import Post from '../model/posts.model';
import User from '../model/user.model';
import Comment from '../model/comments.model';

import usersRepository from '../repository/user.memory.repository';
import postsRepository from '../repository/posts.memory.repository';
import commentsRepository from '../repository/comments.memory.repository';
import { RequestError } from '../error/request.error';

const getAll = async() => {
    const users = await usersRepository.getAll();
    users.forEach((user : User) => {
        const modifiedUser = user;
        postsRepository.getPostsByUserId(user.id).then((value: Post[]) => {
            modifiedUser.posts = value;
        });
        commentsRepository.getByUserId(user.id).then((value : Comment[]) => {
            modifiedUser.comments = value;
        })
    })
    return users;
}
const getUserById = async(id : string) => {
    const user = await usersRepository.getById(id);
    if(!user) throw new RequestError(400,`User with ID:${  id  } not found!`);
    postsRepository.getPostsByUserId(user.id).then((value: Post[]) => {
        user.posts = value;
    });
    commentsRepository.getByUserId(user.id).then((value : Comment[]) => {
        user.comments = value;
    })
    return user;
}
const saveUser = async(user : User) => {
    if(!user.login || !user.password || !user.name) throw new RequestError(400,"Bad credentials!")
    return usersRepository.save({ login: user.login, name: user.name, password: user.password });
}
const updateUserById = async(id : string, user: User) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    const updatedUser = usersRepository.updateById(id, user);
    if(!updatedUser) throw new RequestError(400,`User with ID:${  id  } not found!`);
    return updatedUser;
}
const deleteUserById = async(id : string) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    const deletedUser = await usersRepository.deleteById(id);
    if(!deletedUser) throw new RequestError(400,`User with ID:${  id  } not found!`);
    postsRepository.deleteByUserId(id).then((value : Post[]) => {
        deletedUser.posts = value
    });
    commentsRepository.deleteByUserId(id).then((value : Comment[]) => {
        deletedUser.comments = value
    });
    if(deletedUser.posts) deletedUser.posts.forEach((post : Post) => {
        commentsRepository.deleteByPostId(post.id);
    });
    return deletedUser;
}
const getUserPosts = async(id : string) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    return postsRepository.getPostsByUserId(id);
}
const getUserComments = async(id : string) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    return commentsRepository.getByUserId(id)
}

export default { getAll, getUserComments, getUserPosts, saveUser, updateUserById, deleteUserById, getUserById };
