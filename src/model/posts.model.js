const {v4:uuid} = require('uuid');
const User = require('./user.model');

class Post {
  constructor({ id = uuid(), title = 'Post', text = '', createdAt = new Date(), user = new User(), comments = [] } = {}) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.user = user;
    this.comments = comments;
  }

  static toResponse(post) {
    const { id, title, text, createdAt, user, comments } = post;
    return { id, title, text, createdAt, user, comments };
  }
}

module.exports = Post;
