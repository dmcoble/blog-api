// Since we don't need persistence I temporarily store
// data in map to act as a temporary "database/cache".
// In a real application I would use a database such as
// MongoDB or Postgres and have the required functions here.


var commentStore = new Map();
var commentid = 0;


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
  }
};

