var router = require('express').Router();
var dateTime = require('node-datetime');

var art = require('../../models/articles');


// Post an article
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

