var router = require('express').Router();

// Define our routes
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });   
});
router.use('/articles', require('./articles'));

// Error handling
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;


