# GA01 - RESTful API - Group 09 - Manual

## Group Information
- **21127092** - Trần Hoàng Lâm
- **21127147** - Võ Anh Quân
- **21127151** - Nguyễn Nhật Quang
- **21127629** - Trần Minh Khoa

## Technologies Applied
- **ExpressJS**
- **Knex**
- **gRPC**

## Prerequisites
- **MySQL** installed on your system.
- **Sakila** database imported to your MySQL.

## Installation Steps

1. **Open the Project**  
   Navigate to the submitted folder and open it in an IDE (e.g., VSCode).

2. **Install Required Packages**  
   Open the Terminal and run the following command to install all required packages for both the server and the client:
   ```bash
   npm install
   ```

3. **Configure Database Connection**  
   Create a `.env` file base on the given `sample.env` file with your database configuration

4. **Start the Server**  
   In the Terminal, execute the following command to start the server and the client:
   ```
   npm start
   ```

## Endpoints

### Actor Routes
- **GET /actor**  
  Returns a full list of actors in the database.

- **GET /actor/:id**  
  Returns a single actor by ID.

- **POST /actor**  
  Adds a new actor to the database.

- **DELETE /actor/:id**  
  Deletes an actor from the database by ID.

- **PUT /actor/:id**  
  Updates an existing actor in the database by ID.