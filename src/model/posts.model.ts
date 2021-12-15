import { v4 as uuid } from 'uuid';
import User from './user.model';
import Comment from './comments.model';

export default class Post {
  public id: string;

  public title?: string;

  public text?: string;

  public comments?: Comment[];

  public user: User;

  public createdAt?: Date;

  constructor({
                id = uuid(),
                title = 'Post',
                text = '',
                createdAt = new Date(),
                user = new User(),
                comments = [],
              } = {}) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.user = user;
    this.comments = comments;
  }

  static toResponse(post: { id: string; title: string; text: string; createdAt: Date; user: User; comments: Comment[]; }) {
    const { id, title, text, createdAt, user, comments } = post;
    return { id, title, text, createdAt, user, comments };
  }
}

module.exports = Post;
