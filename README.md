# sofomo-assigment
Project created for Sofomo job application

## Quick setup using Docker
1. Clone repository to local folder
2. Create .env file in backend folder
3. Prepare http://ipstack.com API key, generate secrets for access token and refresh token. You can use this command to create random string:
```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
4. Add http://ipstack.com API key and secrets to .env file as shown here
```
IPSTACK_API_KEY=xxxxxxxxxxx
ACCESS_TOKEN_SECRET=accesstokensecret
REFRESH_TOKEN_SECRET=refreshtokensecret
```
5. Build and run the app by using docker-compose
```
docker-compose build
docker-compose up
```
6. Enjoy! The frontend is running at http://localhost:3000, backend at http://localhost:5000.

## Backend API documentation
This API uses JSON for its input and output and JWT for its security. To use geolocation part of API you need to have valid access token. Access token has expiry time of 15 minutes and refresh token expires in half year or after first use.

### Authentication
#### Register: POST /api/auth/register
Creates a new user.

Request data example:
```
{
  "email": "test@test.pl"
  "password": "test"
}
```
Response data example:
```
{
  "accessToken": "eyJhbGciOiJIUzHBJH83...NiCJ5o"
  "refreshToken": "eyJhbGciOiJIsdf3425...6k0Nio"
}
```

#### Login: POST /api/auth/login
Logins to existing account.

Request data example:
```
{
  "email": "test@test.pl"
  "password": "test"
}
```
Response data example:
```
{
  "accessToken": "eyJhbGciOiJIUzHBJH83...NiCJ5o"
  "refreshToken": "eyJhbGciOiJIsdf3425...6k0Nio"
}
```

#### Refresh token: POST /api/auth/refreshToken
Creates new access token and refresh token, your current refresh token will be expired.

Request data example:
```
{
  "refreshToken": eyJhbGciOiJIsdf3425...6k0Nio"
}
```
Response data example:
```
{
  "accessToken": "eyJhbGciOiJIUzHBJH83...NiCJ5o"
  "refreshToken": "eyJhbGciOiJIsdf3425...6k0Nio"
}
```

### Geolocation
This part of API requires vaild access token in Authentication header.
As address param you can use IP address, hostname, or full URL, the API should handle it all.

#### Get all: GET /api/geolocation
Gets all geolocations stored in database

Response data example:
```
[{
  "_id": "615609896b1be1e2b3c35a92",
  "ip": "142.250.188.206",
  "city": "Los Angeles",
  "continent": "North America",
  "country": "United States",
  "region": "California",
  "zip": "90013",
  "callingCode": "1",
  "capital": "Washington D.C.",
  "countryFlag": "🇺🇸",
  "createdAt": "2021-09-30T19:01:29.154Z",
  "updatedAt": "2021-09-30T19:01:29.154Z",
  "__v": 0
},
 ...
]
```

#### Get one: GET /api/geolocation/:address
Gets geolocation data of address specified in params. If address doesn't exist in database http://ipstack.com/ API will be used instead, and data will be saved to database.

Response data example:
```
{
  "_id": "615609896b1be1e2b3c35a92",
  "ip": "142.250.188.206",
  "city": "Los Angeles",
  "continent": "North America",
  "country": "United States",
  "region": "California",
  "zip": "90013",
  "callingCode": "1",
  "capital": "Washington D.C.",
  "countryFlag": "🇺🇸",
  "createdAt": "2021-09-30T19:01:29.154Z",
  "updatedAt": "2021-09-30T19:01:29.154Z",
  "__v": 0
}
```

#### Update/Replace: PUT /api/geolocation/:address
Replaces (or creates if doesn't exsist) geolocation object with address specified in params with the object send in request data.

Request data example:
```
{
  "city": "TEST",
  "continent": "TEST",
  "country": "United States",
  "region": "California",
  "zip": "90013",
  "callingCode": "1",
  "capital": "Washington D.C.",
  "countryFlag": "🇺🇸",
}
```

Response data example:
```
{
  "_id": "615609896b1be1e2b3c35a92",
  "ip": "142.250.188.206",
  "city": "TEST",
  "continent": "TEST",
  "country": "United States",
  "region": "California",
  "zip": "90013",
  "callingCode": "1",
  "capital": "Washington D.C.",
  "countryFlag": "🇺🇸",
  "createdAt": "2021-09-30T19:01:29.154Z",
  "updatedAt": "2021-09-30T19:01:29.154Z",
  "__v": 0
}
```

#### Create: POST /api/geolocation/:address
Creates new geolocation object with address specified in params. Returns error if object with this address already exist.

Request data example:
```
{
  "city": "TEST",
  "continent": "TEST",
  "country": "United States",
  "region": "California",
  "zip": "90013",
  "callingCode": "1",
  "capital": "Washington D.C.",
  "countryFlag": "🇺🇸",
}
```

Response data example:
```
{
  "_id": "615609896b1be1e2b3c35a92",
  "ip": "142.250.188.206",
  "city": "TEST",
  "continent": "TEST",
  "country": "United States",
  "region": "California",
  "zip": "90013",
  "callingCode": "1",
  "capital": "Washington D.C.",
  "countryFlag": "🇺🇸",
  "createdAt": "2021-09-30T19:01:29.154Z",
  "updatedAt": "2021-09-30T19:01:29.154Z",
  "__v": 0
}
```

#### Delete: DELETE /api/geolocation/:address
Removes geolocation object with address specified in params from database.

Response data example:
```
{
  "type": "info",
  "message": "Object with this IP was successfully removed",
}
```

### Errors
Errors thrown by API have type and message property.

Error example:
```
{
  "type": "info",
  "message": "Object with this IP adress already exist in database"
}
