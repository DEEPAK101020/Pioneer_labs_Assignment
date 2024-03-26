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

- Backend:https://pioneer-labs-assignment-wxni.onrender.com/

 ###Implement User Authentication with JWT

#### API Endpoints:

- /user/alldata
  - Used to register user with name,email and password
  - Method: GET

  ```json
  {
  "user": [
    {
      "_id": "66028fc40ebf21e2f639541c",
      "name": "Deepak",
      "email": "dk2@gmail.com",
      "password": "$2b$05$heHmw03mI/jD8s5PAd0vx.NtK0bn6BU3mnJk43ZCBAK7x1hXZpWAK"
    },
    {
      "_id": "6602bbd2d81d236e71b83010",
      "name": "deep",
      "email": "dk@gmail.com",
      "password": "$2b$05$L/fyout2XLW0UGkRibfVH.hi9D8E4bvCpkvC.LYkxA8I3nC4C7VD."
    },
    {
      "_id": "6602f571ede028891e69bb76",
      "name": "pl",
      "email": "pk@gmail.com",
      "password": "$2b$05$9Od.umQ54lHBqhI4B4KSju9wqM5HnAmUeHbn021ahWssWSNlYTTXS"
    },
    {
      "_id": "6602fdd0df4481dbf350914c",
      "name": "bhaskar",
      "email": "bh@email.com",
      "password": "$2b$05$4Xf5zS5.y4FUMLLEZEkKeu1sM6XdAw3yblwqvcVckoUmKVpEz/11a"
    }
  ]
  ```


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


- API Endpoint:
- https://api.publicapis.org/entries/data/fetch/
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
# Implementing Swagger Documentation and Securing API Endpoint

##Implement Swagger Documentation

Swagger documentation has been implemented for this project. You can access the documentation [here](https://pioneer-labs-assignment-wxni.onrender.com/swagger/).

##Secure API Endpoint for Authenticated Users Only

### API Endpoint: `/admin/protected/`

To access the `admin/protected/` endpoint, an access token must be passed in the headers with the `Authorization` key.

Example using URL:
```bash
curl -X 'GET' \
  'https://pioneer-labs-assignment-wxni.onrender.com/admin/protected/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>'


