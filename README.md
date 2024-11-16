# Car Management Application
This is a Car Management application built with Node.js, Express, and SQLite. The application allows users to register, log in, and manage car records, including adding, updating, viewing, and deleting car information. It also supports user profile management and provides JWT-based authentication for secure access.


+-------------+              +-------------+              +-----------------+
|  regUsers   |              |    cars     |              |   car_images    |
+-------------+              +-------------+              +-----------------+
| id (PK)     |              | id (PK)     |              | id (PK)         |
| email       |              | car_name    |              | image           |
| password    |              | car_desc    |              | car_id (FK)     |
| name        |              | thumbnail   |              +-----------------+
| phone       |              | userId (FK) |
+-------------+              +-------------+              


## Features

- **User Authentication**: Users can register and log in. Passwords are securely hashed with bcrypt, and JSON Web Tokens (JWT) are used for authorization.
- **CRUD Operations**: Authenticated users can create, read, update, and delete their cars.
- **Profile Management**: Authenticated users can update their profile details.
- **Protected Routes**: Certain routes require JWT-based authentication for access.

## Project Structure

- `index.js`: The main index file, which initializes the Express app, database connection, and defines the API endpoints.
- `cars.db`: SQLite database file that stores user and cars information.

## Prerequisites

- Node.js
- SQLite3

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>

2. Install Dependencies
    
    npm install

3. Start the server
 
    node index.js

## API Endpoints


## User Registration

Endpoint: /
Method: POST
Description: Registers a new user.
Request Body:{
  "id": "user_id",
  "mailId": "user_email",
  "pswrd": "user_password",
  "name": "user_name",
  "mblNum": "user_phone"
}
Response: "ok" if registration is successful, otherwise "not ok".

## User Login

Endpoint: /login
Method: POST
Description: Logs in a user and provides a JWT token.
Request Body:{
  "mailId1": "user_email",
  "pswrd1": "user_password"
}
Response:

Success:

{
  "jwtToken": "token",
  "userLoginName": "user_name",
  "userIdt": "user_id"
}

Failure:

 status:401 (password Mismatch)
 message:'not ok1'

 status:404 (User Not Found)
 message:'not ok2'

## Middleware for Authorization

Description: Protects routes by checking for a valid JWT in the Authorization header.

## Update Profile Information

Endpoint: /detailsupdate/:userIdtn
Method: PUT
Description: Updates a user's profile information.
Request Body:{
  "updName": "new_name",
  "updEmail": "new_email",
  "updPswd": "new_password",
  "updPhone": "new_phone"
}
Response:'updated' if successful and "error message" if unsuccessful.

## Get Profile Information

Endpoint: /profileInfo/:pid
Method: GET
Description: Retrieves profile information of a specific user.
Response: User profile data.

## Delete User

Endpoint: /delUser/:delId
Method: DELETE
Description: Deletes a user and all their associated tasks.
Response: "deleted" if successful and "error message" if unsuccessful.

+-----------------------------------------------------------------------------------------+

## GET PRODUCT DETAILS OF USER

Endpoint: /products/:id
Method: GET
Description: This endpoint retrieves a list of cars associated with a user, optionally filtering by a search query for car names.
Response:
{
  "data": [
    {
      "id": 1,
      "car_name": "Lamborgini",
      "thumbnail": "lamborgini image file"
    },
    {
      "id": 2,
      "car_name": "Mustang",
      "thumbnail": "mustang image file"
    }
  ]
}

500 Internal Server Error: If there is an error in retrieving the data from the database.

## GET CAR DETAILS

Endpoint: /details/:id
Method: GET
Description:This endpoint retrieves detailed information about a specific car, including the car's images.
Response:
{
  "id": 1,
  "car_name": "lamborgini",
  "car_desc": " some description about lamborgini",
  "thumbnail": "lamborgini thumbnail image",
  "similarImages": [
    {
      "car_id": 1,
      "image": "lamborgini_1.img"
    },
    {
      "car_id": 1,
      "image": "lamborgini_2.img"
    }
  ]
}
500 Internal Server Error: If there is an error fetching the car details or images.


## CREATE CARS

Endpoint: /upload-images
Method: POST
Description:This endpoint allows a user to upload a new car, including its details (name, description, and images). The request must include the car name, description, and at least one image (both thumbnail and additional images).
Request Body:POST /upload-images
Content-Type: multipart/form-data
{
  "carName": "Toyota Camry",
  "description": "A reliable sedan.",
  "userIdentity": "123",
  "thumbnail": <file>,
  "images": [<file>, <file>]
}
Response: 
200 OK: Returns a success message and the status of the car creation.
{
  "message": "Car and images uploaded successfully!"
}

400 Bad Request: If any required fields are missing or invalid.

500 Internal Server Error: If there is an error inserting data into the database.

## UPDATE CAR DETAILS

Endpoint: /update/:id
Method: PUT
Description: This endpoint allows updating the details of an existing car. The update includes the car's name, description, and images.
Request Body:PUT /update/1
Content-Type: multipart/form-data
{
  "carName": "Toyota Camry",
  "description": "An upgraded sedan.",
  "userIdentity": "123",
  "updImg": <file>,
  "updImages": [<file>, <file>]
}
Response: 
200 OK: Returns a success message indicating the car and images were updated successfully.
{
  "message": "Car and images updated successfully!"
}
400 Bad Request: If any required fields are missing or invalid.

500 Internal Server Error: If there is an error updating the car data in the database.

## DELETE CAR DETAILS

Endpoint: /delete/:id
Method: DELETE
Description: This endpoint deletes a car and its associated images from the database.
Response:
200 OK: Returns a success message indicating the car was deleted.
{
  "message": "Car deleted successfully"
}
500 Internal Server Error: If there is an error deleting the car or its images.

