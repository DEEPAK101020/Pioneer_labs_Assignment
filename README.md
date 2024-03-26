## Technologies used:
- Nodejs
- Expressjs
- MongoDB

### NPM Packages used:
- axios
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- nodemon
- mongoose
- swagger-jsdoc
- swagger-ui-express


## Deployed links

- Backend:

### Task1: Implement User Authentication with JWT

#### API Endpoints:

- /user/registration
  - Used to register user with name,email and password
  - Method: POST
  - Request Body:
```json
  {
    "name":"deep",
    "email":"dk@@gmail.com",
    "password":"1234"
}
```
  - Response:
```json
{
    "Message": "New User deep registered"
}
```
- /user/login
   - Used to login with registered email and password
   - Method: POST
   - Request Body:
```json
{
    
    "email":"dk@gmail.com",
    "password":"1234"
}
```
   - Response:
```json
{
    "Hello": "deep",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NjAyYmJkMmQ4MWQyMzZlNzFiODMwMTAiLCJuYW1lIjoiZGVlcCIsImlhdCI6MTcxMTQ2MTAwMCwiZXhwIjoxNzEyMDY1ODAwfQ.raoeQyY3MbRqGZGXMF_mTqKG2UvzJ27kzU5xHtomr90"
}
```
- /user/logout
  - Used to logout user
  - Method: GET
  - Response:
```json
{
    "Message": "session logged out"
}
```

### Task2  Create API Endpoints for Data Retrieval

- API Endpoint:
- /api/data
- Method: GET
- Used to retrieve data about api
- Able to filter data using category=CategoryName in request query
- Able to paginate using page and limit
- Example : http://localhost:3000/fetch/?limit=1&page=1&category=anime
- Response:
```[
  {
    "API": "AniAPI",
    "Description": "Anime discovery, streaming & syncing with trackers",
    "Auth": "OAuth",
    "HTTPS": true,
    "Cors": "yes",
    "Link": "https://aniapi.com/docs/",
    "Category": "Anime"
  }
]

```

