const uuid = require('uuid');
const Post = require('./posts.model');
const User = require('./user.model');

class Comment {
  constructor({ id = uuid(), text = '', createdAt = new Date().now(), user = new User(), post = new Post() } = {}) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.user = user;
    this.post = post;
  }

  static toResponse(user) {
    const { id, text, createdAt, user, post } = user;
    return { id, text, createdAt, user, post };
  }
}

module.exports = Comment;
