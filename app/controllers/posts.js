
var Post = require('../models/post.js');


exports.index = function *() {
  var posts = yield Post.find().exec();
  this.body = yield this.render('posts/index', {
    title: 'Posts',
    posts: posts
  });
}

exports.new = function *() {
  this.body = yield this.render('posts/new', {
    title: 'New Post',
    post: new Post({})
  });
};

exports.show = function *() {
  var id = this.params.id;
  var post = yield Post.findOne({ _id: id }).exec();
  this.body = yield this.render('posts/show', {
    title: 'Post',
    post: post
  });
}

exports.edit = function *() {
  var id = this.params.id;
  var post = yield Post.findOne({ _id: id }).exec();
  this.body = yield this.render('posts/edit', {
    title: 'Edit Post',
    post: post
  });
};

exports.create = function *() {
  var data = this.data[0];
  var post = new Problem(data)
  yield post.save();
  this.emit('res:post:create', post);
}

exports.update = function *() {
  var data = this.data[0];
  var post = yield Problem.findOne({_id: data.id}).exec();
  yield post.save();
  this.emit('res:post:update', post);
}


