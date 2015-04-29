
var posts = require('../app/controllers/posts')

module.exports = function (app) {

  // RESTful API for Socket.io
  app.io.route('req:posts:create', posts.create);
  app.io.route('req:posts:update', posts.update);

  // RESTful API
  app.get('/', posts.index);
  app.get('/posts/:id', posts.show);
  app.get('/posts/:id/edit', posts.edit);

}
