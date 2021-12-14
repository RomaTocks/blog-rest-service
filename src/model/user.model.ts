import { v4 as uuid } from 'uuid';
import Post from './posts.model';
import Comment from './comments.model';

export default class User {

  public id: string;

  public name: string;

  public login: string;

  public password: string;

  public posts: Post[];

  public comments: Comment[];

  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd', posts = [], comments = [] } = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
    this.posts = posts;
    this.comments = comments;
  }

  static toResponse(user: { id: string; name: string; login: string; posts: Post[]; comments: Comment[]; }) {
    const { id, name, login, posts, comments } = user;
    return { id, name, login, posts, comments };
  }
}
