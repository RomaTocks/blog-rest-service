const usersRepository = require('../repository/user.memory.repository');
const postsRepository = require('../repository/posts.memory.repository');
const commentsRepository = require('../repository/comments.memory.repository');

const getAll = async() => {
    const users = await usersRepository.getAll();
    users.forEach(user => {
        const modifiedUser = user;
        postsRepository.getPostsByUserId(user.id).then(value => {
            modifiedUser.posts = value;
        });
        commentsRepository.getByUserId(user.id).then(value => {
            modifiedUser.comments = value;
        })
    })
    return users;
}
const getUserById = async(id) => {
    const user = await usersRepository.getById(id);
    if(!user) throw new Error(`User with ID:${  id  } not found!`)
    postsRepository.getPostsByUserId(user.id).then(value => {
        user.posts = value;
    });
    commentsRepository.getByUserId(user.id).then(value => {
        user.comments = value;
    })
    return user;
}
const saveUser = async(user) => {
    if(!user.login || !user.password || !user.name) throw new Error("Bad credentials!")
    const newUser = await usersRepository.save(user);
    return newUser;
}
const updateUserById = async(id, user) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    const updatedUser = usersRepository.updateById(id, user);
    if(!updatedUser) throw new Error(`User with ID:${  id  } not found!`);
    return updatedUser;
}
const deleteUserById = async(id) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    const deletedUser = await usersRepository.deleteById(id);
    if(!deletedUser) throw new Error(`User with ID:${  id  } not found!`);
    let posts = [];
    postsRepository.deleteByUserId(id).then(value => {
        posts = value;
    });
    (deletedUser).posts = posts;
    let comments = [];
    commentsRepository.deleteByUserId(id).then(value => {
        comments = value;
    });
    posts.forEach(post => {
        commentsRepository.deleteByPostId(post.id);
    });
    (deletedUser).comments = comments;
    return deletedUser;
}
const getUserPosts = async(id) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    return postsRepository.getPostsByUserId(id);
}
const getUserComments = async(id) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    return commentsRepository.getByUserId(id)
}

module.exports = { getAll, getUserComments, getUserPosts, saveUser, updateUserById, deleteUserById, getUserById };
