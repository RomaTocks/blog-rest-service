const postRepository = require('../repository/posts.memory.repository')
const commentRepository = require('../repository/comments.memory.repository')
const usersRepository = require('../repository/user.memory.repository');
const User = require("../model/user.model");

const getAll = async() => {
    const posts = await postRepository.getAll();
    return posts.map(post => {
        const mappedPost = post;
        commentRepository.getByPostId(post.id).then(value => {
            mappedPost.comments = value;
        });
        return mappedPost;
    })
}
const getPostById = async (id) => {
    const post = await postRepository.getPostById(id);
    if(!post) throw new Error(`Post with ID:${  id  } not found!`)
    commentRepository.getByPostId(post.id).then(value => {
        post.comments = value;
    })
    return post;
}
const getPostCommentsById = async (id) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    const postComments = await commentRepository.getByPostId(id);
    if(!postComments) throw new Error(`Post comments with post ID:${  id  } not found!`)
    return postComments;
}
const getUserByPostId = async (id) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    const userPost = await postRepository.getPostById(id);
    const user = await usersRepository.getById(userPost.user.id);
    return User.toResponse(user);
}
const savePost = async (post) => {
    if(!post.text || !post.user.id || !post.title) throw new Error("Bad credentials!")
    return postRepository.save(post);
}
const updatePostById = async(id,post) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    const updatedPost = postRepository.updatePostById(id, post);
    if(!updatedPost) throw new Error(`Post with ID:${  id  } not found!`)
    return updatedPost;
}
const deletePostById = async(id) => {
    if(id.length !== 36) {
        throw new Error('Bad ID format.')
    }
    const deletedPost = await postRepository.deleteById(id);
    if(!deletedPost) throw new Error(`Post with ID:${  id  } not found!`);
    let comments = [];
    commentRepository.deleteByPostId(id).then(value => {
        comments = value;
    });
    deletedPost.comments = comments;
    return deletedPost;
}

module.exports = { getAll, getPostById, savePost, updatePostById, deletePostById, getPostCommentsById, getUserByPostId };
