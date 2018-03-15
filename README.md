#A demo backend blog api
run `npm install` then `npm start`

##API Spec
###Test
`Get /api/`
Should Return
```
{
  "message": "Welcome to our api!"
}
```

`Get /api/article/:id`
Gets the content of the article from the given id
Response is in the following format:
```
{
  "id": "1",
  "content": "My awesome article"
}
```


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
    "id": 1,
    "nickname": "Bro",
    "title": "Cool Title",
    "content": "My awesome article",
    "creationDate": "2018-03-15T00:04:06.370Z"
  }
}

```
