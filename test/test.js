// Normally I would seperate out test but since this is
// a small project I think its appropriate to just keep
// all the tests in one spot


var request = require('supertest');

describe('loading express', function () {
  var app = require('../app');
  var http = require('http');
  var server = http.createServer(app);

  //Sample data. 
  var articleReq = {"title": "Title","content": "cccc","nickname": "name"};
  var contentRes = {id: "0", content: "cccc"};



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

  it('Post an article to /api/articles/', function testSlash(done) {
    request(server)
      .post('/api/articles')
      .send({"article": articleReq}) 
      .expect(200, done);
  });

  it('Get an articles content from /api/articles/:id', function testSlash(done) {
    // populate article
    request(server)
      .post('/api/articles')
      .send({"article": articleReq}) 
    // get article and compare content
    request(server)
      .get('/api/articles/0')
      .expect(200, contentRes, done)
  });

  it('Get list of articles from /api/articles', function testSlash(done) {
    this.timeout(10 * 1000);
    // populate 50 articles
    
    for (i = 0; i < 50; i++) {
      (function(n) {
        request(server)
          .post('/api/articles')
          .send({"article": articleReq}) 
      })(i);
    }
    // see if I get 20 articles back 
    request(server)
      .get('/api/articles')
      .expect(returnsList)
      .end(done);

    function returnsList(res) {
      if (res.body.articleNum == 20 ) throw new Error(res.body.articleNum);
    }
  });

});

