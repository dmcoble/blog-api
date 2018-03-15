// Since we don't need persistence I temporarily store
// data in map to act as a temporary "database/cache".
// In a real application I would use a database such as
// MongoDB or Postgres and have the required functions here.


var articleStore = new Map();


module.exports = {
  // Makes a new Article and stores it in the map
  createArticle: function (nickname, title, content, creationDate, id) {
    return new Promise((resolve, reject) =>{
      // Create an ID and Article struct
      // The id is indexed at 0
      var id = articleStore.size; 
      var article = {id: id, nickname: nickname, title: title, content: content, creationDate: creationDate};

      // Store them in the map
      articleStore.set(id, article);

      // Create the JSON response
      response = {article: article}
      resolve(response);  
    });
  },
  // Gets an articles content by the articles id
  getArticle: function (id) {
    return new Promise((resolve, reject) =>{
      // Gets the article based on the ID
      art = articleStore.get(parseInt(id));

      // Create the JSON response
      response = {id: id, content: art.content};
      resolve(response);  
    });
  },
  // Lists all articles but only returns 20 at a time
  // use ?offset= to change what ones get returned
  getArticleList: function (offset) {
    // Get total number of articles we need to return
    // only need to +19 b/c we index at 0
    var total = offset + 19

    // Get the ammount of articles in storage
    var inStorage = articleStore.size

    // If we have less than 20 left to return only
    // return the amount we need so we dont go through
    // extra loops. Otherwise return the full 20
    if (total > inStorage ) {
      var dif = total - inStorage;
      total = total - dif;
    }

    return new Promise((resolve, reject) =>{
      var articles = [];

      // Loop through starting at the offset 
      for (i = offset; i < total; i++) {
        // Get the articles from the datastore 
        // then save it in an array for our response
        art = articleStore.get(i);
        info = {id: art.id, title: art.title, nickname: art.nickname, creationDate: art.creationDate}
        articles.push(info)
      }

      // Create the JSON response
      var response = {articleNum: total - offset, articles: articles};
      resolve(response);  
    });
  }
};




