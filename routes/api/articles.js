var router = require('express').Router();
var dateTime = require('node-datetime');

var art = require('../../models/articles');


// Get list of articles 
// gives nickname, creation date, and title
router.get('/', function(req, res, next) {
  var offset = 0;

  //if no offset leave it at 0 otherwise change the value
  if(typeof req.query.offset !== 'undefined'){
    offset = parseInt(req.query.offset);
  }

  // Promise function to get articles then return results
  art.getArticleList(offset).then(function(result) {
   return res.json(result);   
  });
});

// Get article content by id
router.get('/:id', function(req, res, next) {
  
  var id =  req.params.id;
  art.getArticle(id).then(function(result) {
   return res.json(result);   
  });
});

// Post an article
router.post('/', function(req, res, next) {

  var a = req.body.article;
  var dt = dateTime.create();
  var creationDate = new Date(dt.now());
  // create new promise for storing into "database"
    art.createArticle(a.nickname, a.title, a.content, creationDate).then(function(result) {
      return res.json(result);
    });
});

module.exports = router;

