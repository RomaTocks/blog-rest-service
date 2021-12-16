import Post from '../model/posts.model';
import User from '../model/user.model';
import Comment from '../model/comments.model';

import postRepository from '../repository/posts.memory.repository';
import commentRepository from '../repository/comments.memory.repository';
import usersRepository from '../repository/user.memory.repository';
import { RequestError } from '../error/request.error';

const getAll = async() => {
    const posts = await postRepository.getAll();
    return posts.map((post ) => {
        const mappedPost = post;
        commentRepository.getByPostId(post.id).then((value : Comment[]) => {
            mappedPost.comments = value;
        });
        return mappedPost;
    })
}
const getPostById = async (id : string) => {
    const post = await postRepository.getPostById(id);
    if(!post) throw new RequestError(400,`Post with ID:${  id  } not found!`)
    commentRepository.getByPostId(post.id).then((value : Comment[]) => {
        post.comments = value;
    })
    return post;
}
const getPostCommentsById = async (id : string) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    const postComments = await commentRepository.getByPostId(id);
    if(!postComments) throw new RequestError(400,`Post comments with post ID:${  id  } not found!`)
    return postComments;
}
const getUserByPostId = async (id : string) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    const userPost = await postRepository.getPostById(id);
    if(!userPost) throw new RequestError(400,`Post with post ID:${  id  } not found!`)
    const user = await usersRepository.getById(userPost.user.id);
    return user ? User.toResponse(user) : null;
}
const savePost = async (post : { title:string,text:string,user:User }) => {
    if(!post.text || !post.user.id || !post.title) throw new RequestError(400,"Bad credentials!")
    return postRepository.save(post);
}
const updatePostById = async(id : string,post : Post) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    const updatedPost = postRepository.updatePostById(id, post);
    if(!updatedPost) throw new RequestError(400,`Post with ID:${  id  } not found!`)
    return updatedPost;
}
const deletePostById = async(id : string) => {
    if(id.length !== 36) {
        throw new RequestError(400,'Bad ID format.')
    }
    const deletedPost = await postRepository.deleteById(id);
    if(!deletedPost) throw new RequestError(400,`Post with ID:${  id  } not found!`);
    commentRepository.deleteByPostId(id).then((value : Comment[]) => {
        deletedPost.comments = value;
    });
    return deletedPost;
}

export default { getAll, getPostById, savePost, updatePostById, deletePostById, getPostCommentsById, getUserByPostId };
