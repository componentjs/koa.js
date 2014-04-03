
var request = require('supertest');
var koa = require('koa');
var vm = require('vm');

var serve = require('..')({
  root: __dirname
});

var server = koa().use(serve).listen();

it('should serve js', function (done) {
  request(server)
  .get('/build.js')
  .expect('content-type', 'application/javascript')
  .expect(200, function (err, res) {
    if (err) return err;

    var js = res.text;
    var ctx = vm.createContext();
    vm.runInContext(js, ctx);
    done();
  })
})

it('should serve css', function (done) {
  request(server)
  .get('/build.css')
  .expect('content-type', 'text/css; charset=utf-8')
  .expect(200, done);
})

it('should 404 otherwise', function (done) {
  request(server)
  .get('/kljalskdjfasdf')
  .expect(404, done);
})
