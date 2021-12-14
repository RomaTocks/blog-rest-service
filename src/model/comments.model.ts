import { v4 as uuid } from 'uuid';
import Post from './posts.model';
import User from './user.model';


export default class Comment {
  public id: string;

  public text: string;

  public createdAt: Date;

  public user: User;

  public post: Post;

  constructor({ id = uuid(), text = '', createdAt = new Date(), user = new User(), post = new Post() } = {}) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.user = user;
    this.post = post;
  }

  static toResponse(comment: { id: string; text: string; createdAt: Date; user: User; post: Post; }) {
    const { id, text, createdAt, user, post } = comment;
    return { id, text, createdAt, user, post };
  }
}
