var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var views = require('co-views');
var session = require('koa-session');

var logger = require('koa-logger');
var koaBody = require('koa-body');
var responseTime = require('koa-response-time');
var staticCache = require('koa-static-cache');
var compress = require('koa-compress');
var gzip = require('koa-gzip');
var less = require('koa-less');

var swig = require('swig');
var config = require('config');

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (app) {

  app.use(responseTime());

  app.use(compress());
  // app.use(serve(config.root + '/public'));
  app.use(less(config.root + '/app/assets'));
  app.use(serve(config.root + '/temp'));
  app.use(serve(config.root + '/bower_components'));
  app.use(serve(config.root + '/app/assets'));

  app.use(staticCache(config.root + '/public', {
    maxAge: 365 * 24 * 60 * 60
  }));

  app.keys = ['session']
  app.use(session(app));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(logger());

  app.use( function *(next) {
    if (!this.req.isAuthenticated()) {
      var count = yield User.count().exec();
      var user = new User({
        username: 'guest-' + count,
        password: 'guest',
        provider: 'local',
        guest: true,
      });
      yield user.save()
      yield this.login(user)
      console.log('Create ' + user.username);
      yield next;
    }

    this.locals = {
      title: 'App',
      current_user: this.req.user
    }
    yield next;
  })

  app.use( function *(next) {
    this.render = views(config.root + '/app/views', {
      map: { html: 'swig' },
      locals: this.locals
    });
    yield next;
  });



  app.use(router(app))
