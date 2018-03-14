// Normally I would seperate out test but since this is
// a small project I think its appropriate to just keep
// all the tests in one spot


var request = require('supertest');

describe('loading express', function () {
  var app = require('../app');
  var http = require('http');
  var server = http.createServer(app);
  beforeEach(function () {
    server.listen(3000);
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /api/', function testSlash(done) {
  request(server)
    .get('/api/')
    .expect(200, done);
  });
});

