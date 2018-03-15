// Since we don't need persistence I temporarily store
// data in map to act as a temporary "database/cache".
// In a real application I would use a database such as
// MongoDB or Postgres and have the required functions here.


var articleStore = new Map();


module.exports = {
  // Makes a new Article and stores it in the map
  createArticle: function (nickname, title, content, creationDate) {

    return new Promise((resolve, reject) =>{
      // Create an ID and Article struct
      var id = articleStore.size + 1; 
      var article = {id: id, nickname: nickname, title: title, content: content, creationDate: creationDate};

      // Store them in the map
      articleStore.set(id, article);
      // Create the JSON response
      response = {article: article}
      resolve(response);  
    });
  }

};




