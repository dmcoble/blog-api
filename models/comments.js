// Since we don't need persistence I temporarily store
// data in map to act as a temporary "database/cache".
// In a real application I would use a database such as
// MongoDB or Postgres and have the required functions here.


var commentStore = new Map();
var commentid = 0;


function find (obj, func) {
  func(obj);
  if (obj.child) {
    obj.child.forEach(function (child) {
      find (child, func);
    });
  }
}

module.exports = {
  // Stores a new comment to an article 
  createArticleComment: function (nickname, content, creationDate, artID) {
    return new Promise((resolve, reject) =>{
      // Create an ID and Article struct
      // The id is indexed at 0
      var comID = commentid; 

      //increment commentid for the next comment
      commentid++;

      var comment = {id: comID, article: artID, nickname: nickname, content: content, creationDate: creationDate, child: []};

      // Store the new comment in the map at the top level
      commentStore.set(comID, comment);
      
      // Create the JSON response
      response = {comment: comment}
      resolve(response);  
    });
  },
  // Stores a new comment in reply to an already existing comment 
  createCommentComment: function (nickname, content, creationDate, comID) {
    return new Promise((resolve, reject) =>{
      // Create the new comment to store and
      // increment the commentid for the next comment
      var newcom = {id: commentid++, nickname: nickname, content: content, creationDate: creationDate, child: []};
      commentid++;

      //Find the comment that this one is a child of
      commentStore.forEach(function(value) {
        find(value, function(obj){
          //obj.id = comment in our data store
          //comID is the id of the comment we are commenting on
          if (parseInt(obj.id) === parseInt(comID)) {
            // add our comment as a child of the 
            // comment we are replying to
            obj.child.push(newcom);
            
            // Create the JSON response
            response = {comment: newcom}
            return resolve(response);  
          } 
        });
      }); 
      throw {error: "couldn't find commentID"};
    }); 
  },

};

