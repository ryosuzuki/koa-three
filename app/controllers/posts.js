
exports.index = function *() {
  var posts = ['hoge', 'fuga', 'foo'];
  this.body = yield this.render('posts/index', {
    title: 'Posts',
    posts: posts
  });
}

exports.new = function *() {
  this.body = yield this.render('posts/new', {
    title: 'New Post',
    // post: new Lesson({})
  });
};

exports.show = function *() {
  var id = this.params.id;
  var post = ['hoge', 'fuga', 'foo'][id];
  this.body = yield this.render('posts/show', {
    title: 'Post',
    post: post
  });
}

exports.edit = function *() {
  this.body = yield this.render('posts/edit', {
    title: 'Edit Post',
    // post: new Lesson({})
  });
};

exports.create = function *() {
  var data = this.data[0];
  var post = 'hello create';
  // var post = new Problem(post)
  // yield post.save();
  this.emit('res:post:create', post);
}

exports.update = function *() {
  var data = this.data[0];
  var post = 'hello update';
  // var post = new Problem.findOne({_id: data._id})
  // yield post.save();
  this.emit('res:post:update', post);
}


