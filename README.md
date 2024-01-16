# HitchHiker
Initial Design and wireframes
![wireframes](img/Wireframes.png "wireframes")



## Group Members
Nick Alba

Kevin Ghiringelli

Jonathan Pinon

Colin Prise


### Directories

Inside of `ghi` is our React app

Inside of `hikes_api_service` is our FastAPI application.

Also in `hikes_api_service` is a directory for your migrations.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### To run the project

1. Open terminal. CD into a folder git clone https://gitlab.com/hitchhiker3/HitchHiker.git
2. Open the project in VSCODE and run docker compose 
(If you are using M1 Mac run DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build)
3. Next run docker compose up to start Docker containers
4. Navigate to localhost:3000/

### Database tables
These are the tables being created in our database

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(50) NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(150) NOT NULL,
            picture_url VARCHAR(100000) NULL,
            email VARCHAR(100) NOT NULL,
            university_name VARCHAR(50) NOT NULL,
            university_year SMALLINT NOT NULL
        );
        CREATE TABLE emergency_contact (
            contact_id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(50) NOT NULL,
            relation VARCHAR(50) NOT NULL,
            phone_number BIGINT NOT NULL,
            email VARCHAR(100) NOT NULL,
            users_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
        );
        CREATE TABLE hike (
            hike_id SERIAL PRIMARY KEY NOT NULL,
            trail_name VARCHAR(50) NOT NULL,
            image_url VARCHAR(2000) NOT NULL,
            date_time TIMESTAMP NOT NULL,
            organizer_id INT NOT NULL
            REFERENCES users(user_id) ON DELETE CASCADE,
            hike_description TEXT NULL,
            max_hikers INTEGER NOT NULL CHECK(max_hikers BETWEEN 0 AND 100)
        );
        CREATE TABLE hikes_users(
            user_id INT NOT NULL REFERENCES users(user_id),
            hike_id INT NOT NULL REFERENCES hike(hike_id) ON DELETE CASCADE,
            CONSTRAINT hikes_users_pk PRIMARY KEY (user_id, hike_id),
            CONSTRAINT FK_users FOREIGN KEY (user_id)
            REFERENCES users (user_id),
            CONSTRAINT FK_hikes FOREIGN KEY (hike_id) REFERENCES hike (hike_id)
        );
        CREATE TABLE ride (
            ride_id SERIAL PRIMARY KEY NOT NULL,
            driver_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            max_riders INTEGER NOT NULL CHECK(max_riders BETWEEN 0 and 10),
            meetup_time TIMESTAMP NOT NULL,
            meetup_location VARCHAR(200),
            hike_event INT NOT NULL REFERENCES hike(hike_id) ON DELETE CASCADE
        );
        CREATE TABLE ride_users (
            rider_id INT NOT NULL REFERENCES users(user_id),
            trip_id INT NOT NULL REFERENCES ride(ride_id) ON DELETE CASCADE,
            CONSTRAINT ride_users_pk PRIMARY KEY (rider_id, trip_id),
            CONSTRAINT FK_users FOREIGN KEY (rider_id)
            REFERENCES users (user_id),
            CONSTRAINT FK_rides FOREIGN KEY (trip_id) REFERENCES ride (ride_id)
        );


### Endpoints and expected response for our API
localhost:8000


POST /signup sign up for account
```
{
  "full_name": "string1",
  "username": "string7",
  "password": "string7",
  "picture_url": "string.jpg",
  "email": "string@stringsss.com",
  "university_name": "string",
  "university_year": 2020
}
response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNDhjODAzMS05ZWNiLTQ4ZDQtOWFmMy1iYjU2YzA5YjBiOWYiLCJleHAiOjE2ODYzMDc5MDYsInN1YiI6InN0cmluZzciLCJhY2NvdW50Ijp7InVzZXJfaWQiOjYsImZ1bGxfbmFtZSI6InN0cmluZzEiLCJ1c2VybmFtZSI6InN0cmluZzciLCJwaWN0dXJlX3VybCI6InN0cmluZy5qcGciLCJlbWFpbCI6InN0cmluZ0BzdHJpbmdzc3MuY29tIiwidW5pdmVyc2l0eV9uYW1lIjoic3RyaW5nIiwidW5pdmVyc2l0eV95ZWFyIjoyMDIwfX0.LVZoJPRc6zZSeT9r7sDHkCp6hofVrv5GopuLH-7-uD4",
  "token_type": "Bearer",
  "account": {
    "user_id": 6,
    "full_name": "string1",
    "username": "string7",
    "picture_url": "string.jpg",
    "email": "string@stringsss.com",
    "university_name": "string",
    "university_year": 2020
  }
}
```

GET /users Get all users
```
[
  {
    "user_id": 1,
    "full_name": "string3",
    "username": "string3",
    "picture_url": null,
    "email": "string@string.com",
    "university_name": "WWU",
    "university_year": 2023
  },
  {
    "user_id": 2,
    "full_name": "string",
    "username": "string",
    "picture_url": "string",
    "email": "string@string.com",
    "university_name": "string",
    "university_year": 2020
  },
  {
    "user_id": 6,
    "full_name": "string1",
    "username": "string7",
    "picture_url": "string.jpg",
    "email": "string@stringsss.com",
    "university_name": "string",
    "university_year": 2020
  }
]
```
PUT /users/{user_id} Update user
```
{
  "full_name": "changedname",
  "username": "strings",
  "password": "strings",
  "picture_url": "strings",
  "email": "strings",
  "university_name": "strings",
  "university_year": 2020
}
```
DELETE /users/{user_id} Delete user
```
response:
true
```

GET /users/{username} Get one user
```
{
  "user_id": 6,
  "full_name": "string1",
  "username": "string7",
  "picture_url": "string.jpg",
  "email": "string@stringsss.com",
  "university_name": "string",
  "university_year": 2020
}
```
GET /hikes Get all hikes
```
[
  {
    "hike_id": 1,
    "trail_name": "Mt Si",
    "image_url": "https://images.pexels.com/photos/1525039/pexels-photo-1525039.jpeg",
    "date_time": "2023-06-08T09:01:00",
    "organizer_id": 1,
    "hike_description": "10 miles Medium Difficulty",
    "max_hikers": 4
  },
  {
    "hike_id": 2,
    "trail_name": "mt st helens",
    "image_url": "https://images.pexels.com/photos/1525039/pexels-photo-1525039.jpeg",
    "date_time": "2023-06-14T01:44:00",
    "organizer_id": 1,
    "hike_description": "amazing trail Moderate 5 mi",
    "max_hikers": 4
  }
]
```
POST /hikes Create hike
```
{
  "trail_name": "Hobbit trail",
  "image_url": "string",
  "date_time": "2023-06-08T23:00:00.971Z",
  "hike_description": "string",
  "max_hikers": 20
}

response
{
  "hike_id": 4,
  "trail_name": "Hobbit trail",
  "image_url": "string",
  "date_time": "2023-06-08T23:00:00.971000+00:00",
  "organizer_id": 6,
  "hike_description": "string",
  "max_hikers": 20
}
```
GET /hikes/{hike_id} Get one hike
```
{
  "hike_id": 4,
  "trail_name": "Hobbit trail",
  "image_url": "string",
  "date_time": "2023-06-08T23:00:00.971000",
  "organizer_id": 6,
  "hike_description": "string",
  "max_hikers": 20
}
```
PUT /hikes/{hike_id} Update one hike
```
{
  "trail_name": "Trail to Mordor",
  "image_url": "string",
  "date_time": "2023-06-08T23:01:54.707Z",
  "hike_description": "string",
  "max_hikers": 20
}
response
{
  "hike_id": 4,
  "trail_name": "Trail to Mordor",
  "image_url": "string",
  "date_time": "2023-06-08T23:01:54.707000+00:00",
  "organizer_id": 6,
  "hike_description": "string",
  "max_hikers": 20
}
```
DELETE /hikes/{hike_id} Delete a hike
```
true
```

POST /userhikes Sign up For Hike
```
{
  "user_id": 1,
  "hike_id": 1
}
response
{
  "user_id": 1,
  "hike_id": 1
}
```
DELETE /userhikes/{user_id}/{hike_id} Unjoin a hike
```
true
```

GET /users/{user_id}/hikes Get user hikes
```
[
  {
    "hike_id": 3,
    "trail_name": "Hobbit trail",
    "image_url": "string",
    "date_time": "2023-06-08T23:00:00.971000",
    "organizer_id": 6,
    "hike_description": "string",
    "max_hikers": 20
  },
  {
    "hike_id": 4,
    "trail_name": "Trail to Mordor",
    "image_url": "string",
    "date_time": "2023-06-08T23:01:54.707000",
    "organizer_id": 6,
    "hike_description": "string",
    "max_hikers": 20
  }
]
```
POST /users/contact Create contact
```
{
  "full_name": "PaPa",
  "relation": "dad",
  "phone_number": 4250001111,
  "email": "dad@dad.com"
}
response
{
  "contact_id": 1,
  "full_name": "PaPa",
  "relation": "dad",
  "phone_number": 4250001111,
  "email": "dad@dad.com",
  "users_id": 6
}
```
PUT /users/contact/{contact_id}
```
{
  "full_name": "Jason",
  "relation": "Brother",
  "phone_number": 233221120,
  "email": "brother@string.com"
}
response
{
  "contact_id": 1,
  "full_name": "Jason",
  "relation": "Brother",
  "phone_number": 233221120,
  "email": "brother@string.com",
  "users_id": 6
}
```
GET /users/{users_id/contact} Get one contact
```
{
  "contact_id": 1,
  "full_name": "Jason",
  "relation": "Brother",
  "phone_number": 233221120,
  "email": "brother@string.com",
  "users_id": 6
}
```
GET /hikes/{hike_id}/rides Get all
```
[
  {
    "ride_id": 2,
    "driver_id": 1,
    "max_riders": 4,
    "meetup_time": "2023-06-08T03:30:00",
    "meetup_location": "dowtown",
    "hike_event": 1
  }
]
```
POST /hikes/{hike_id}/rides Create Ride
```
{
  "max_riders": 40,
  "meetup_time": "2023-06-08T23:13:22.900Z",
  "meetup_location": "library"
}
```
GET /rides/{ride_id} Get one ride
```
{
  "ride_id": 1,
  "driver_id": 1,
  "max_riders": 40,
  "meetup_time": "2023-06-08T23:29:40.531Z",
  "meetup_location": "library",
  "hike_event": 1
}
```
PUT /hikes/{hike_id}/rides/{ride_id} Update ride
```
{
  "max_riders": 10,
  "meetup_time": "2023-06-08T23:31:19.362Z",
  "meetup_location": "downtown"
}
```
DELETE /hikes/{hike_id}/rides/{ride_id} Delete ride
```
true
```
POST /hikes/{hike_id}/rides/{ride_id}/riders Create Rider
```
{
  "rider_id": 1,
  "trip_id": 1
}
response
{
  "rider_id": 1,
  "trip_id": 1
}
```

DELETE /hikes/{hike_id}/rides/{ride_id}/riders Delete rider
```
true
```

GET /rides/{trip_id}/riders Get all riders
```
[]
```
