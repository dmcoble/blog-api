var router = require('express').Router();
var dateTime = require('node-datetime');

var com = require('../../models/comments');


// Post a comment on an article
router.post('/', function(req, res, next) {
  //Get request body
  var a = req.body.comment;

  // Create timestamp
  var dt = dateTime.create();
  var creationDate = new Date(dt.now());

  com.createArticleComment(a.nickname, a.content, creationDate, a.articleID)
    .then(function(result) {
      return res.json(result);
    })
    .catch(function(error) {
      return res.json(error); 
    });
});

// Post a comment in reply to a comment already made
router.post('/comment', function(req, res, next) {
  //Get request body
  var a = req.body.comment;

  // Create timestamp
  var dt = dateTime.create();
  var creationDate = new Date(dt.now());

  com.createCommentComment(a.nickname, a.content, creationDate, a.commentID)
    .then(function(result) {
      return res.json(result);
    })
    .catch(function(error) {
      return res.json(error); 
    });
});


module.exports = router;

