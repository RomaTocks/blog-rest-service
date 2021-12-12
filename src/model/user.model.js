const {v4:uuid} = require('uuid');

class User {
  constructor({ id = uuid(), name = 'USER', login = 'user', password = 'P@55w0rd', posts = [], comments = []} = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
    this.posts = posts;
    this.comments = comments;
  }

  static toResponse(user) {
    const { id, name, login, posts, comments } = user;
    return { id, name, login, posts, comments };
  }
}

module.exports = User;
