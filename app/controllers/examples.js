
exports.index = function *() {
  this.body = yield this.render('examples/index');
}

exports.show = function *() {
  var id = this.params.id;
  this.body = yield this.render('examples/'+id);
};
