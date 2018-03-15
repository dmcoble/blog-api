var router = require('express').Router();
var dateTime = require('node-datetime');

var articles = require('../../models/articles');


// Get list of articles but only returns 20 at a time
// use ?offset= to change the offset
router.get('/', function(req, res, next) {
  //if no offset leave it at 0 otherwise change the value
  var offset = 0;
  if(typeof req.query.offset !== 'undefined'){
    offset = parseInt(req.query.offset);
  }

  articles.getArticleList(offset)
    .then(function(result) {
      return res.json(result);   
    })
    .catch(function(error) {
      return res.json(error); 
    });
});

// Get article content by id
router.get('/:id', function(req, res, next) {
  var id =  req.params.id;

  articles.getArticle(id)
    .then(function(result) {
      return res.json(result);   
    })
    .catch(function(error) {
      return res.json(error); 
    });
});

// Post an article
router.post('/', function(req, res, next) {
  var a = req.body.article;

  // Use datetime to make a timestamp
  var dt = dateTime.create();
  var creationDate = new Date(dt.now());

  articles.createArticle(a.nickname, a.title, a.content, creationDate)
    .then(function(result) {
      return res.json(result);
    })
    .catch(function(error) {
      return res.json(error); 
    });
});

module.exports = router;

