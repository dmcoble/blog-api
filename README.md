#A demo backend blog api
run `npm install` then `npm start`
To start in dev mode run `npm run dev`
To run tests run `npm test`

##API Spec
### Test
test the endpoint
`Get /api/`
Should Return
```
{
  "message": "Welcome to our api!"
}
```
###Post
create an article
`Post /api/articles/`
Example Request body:
```
{
  "article": {
    "title": "Cool Title",
    "content": "My awesome article",
    "nickname": "Bro"
  }
}
```
And it should return with 200 Ok and a body like:
```
{
  "article":{
    "id": 0,
    "nickname": "Bro",
    "title": "Cool Title",
    "content": "My awesome article",
    "creationDate": "2018-03-15T00:04:06.370Z"
  }
}
```
### Get article content
Gets the content of the article from the given id
`Get /api/articles/:id`
Response is in the following format:
```
{
  "id": "0",
  "content": "My awesome article"
}
```
### Get list of articles
Gets a list of articles up to 20 at a time.
You can use ?offset=x where x is an int to offset results.
If there are less than 20 remaining to be quaried it will just return however many are left.
I.e. if you have 70 total articles and quaried with ?offset=60 you would only get 10 articles.
`Get /api/articles` or `Get /api/articles?offset=x` where x is any int
Response in in the following format:
```
{
  "articleNum": 2,
  "articles":[
    {
      "id": 0,
      "title": "How to train your dragon2",
      "nickname": "dragon",
      "creationDate": "2018-03-15T03:30:43.568Z"
    },
    {
      "id": 1,
      "title": "How to train your dragon3",
      "nickname": "dragon",
      "creationDate": "2018-03-15T03:30:49.101Z"
    }
  ]
}

```
### Post Comment to article
Post a comment to an article
`Post /api/comments/`
Example Request body:
```
{
  "comment": {
    "articleID": 0,
    "content": "That was a good read",
    "nickname": "Bob"
  }
}
```
And it should return with 200 Ok and a body like:

```
{
  "comment":{
    "id": 3,
    "nickname": "Bob",
    "content": "That was a good read",
    "creationDate": "2018-03-15T08:56:43.855Z",
    "child":[]
  }
}
Note that you get back the comment id not the articleID
### Post comment to a comment
Post a comment in reply to a comment
`Post /api/comments/comment`
Example Request body:
```
{
  "comment": {
    "commentID": 0,
    "content": "I liked it too",
    "nickname": "Jack"
  }
}
```
The commentID is the id of the comment you are replying too
And it should return with 200 Ok and a body like:

```
{
  "comment":{
    "id": 1,
    "nickname": "Jack",
    "content": "I liked it too",
    "creationDate": "2018-03-15T08:56:43.855Z",
    "child":[]
  }
}
```
Note that you get back the comment id not the articleID





