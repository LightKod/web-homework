# GA01 - RESTful API - Group 09 - Manual

## Group Information
- **21127092** - Trần Hoàng Lâm
- **21127147** - Võ Anh Quân
- **21127151** - Nguyễn Nhật Quang
- **21127629** - Trần Minh Khoa

## Technologies Applied
- **ExpressJS**
- **Knex**
- **Swagger** (for API documentation)
- **Winston** (for logging with daily file rotation)

## Prerequisites
- **MySQL** installed on your system.
- **Sakila** database imported to your MySQL.

## Installation Steps

1. **Open the Project**  
   Navigate to the submitted folder and open it in an IDE (e.g., VSCode).

2. **Install Required Packages**  
   Open the Terminal and run the following command to install all required packages:
   ```bash
   npm install
   ```

3. **Configure Database Connection**  
   Create a `.env` file base on the given `sample.env` file with your database configuration

4. **Start the Server**  
   In the Terminal, execute the following command to start the server:
   ```
   npm start
   ```
5. **Access API Documentation**
  Swagger UI documentation is available at http://localhost:3000/api-docs once the server is running.

6. **View Logs**
  Logs are stored in the logs directory, with daily file rotation and automatic compression of old logs. Logs are stored for up to 14 days, with each file limited to 20MB.

## Endpoints

### API Documentation
- **GET /api-docs**  
  Serves the Swagger UI documentation for the API.

### Log Routes
- **GET /logs/search-log**  
  Searches log entries based on a query parameter.

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

### Film Routes
- **GET /films**  
  Returns a full list of films in the database.

- **GET /films/:id**  
  Returns a single film by ID.

- **POST /films**  
  Adds a new film to the database.

- **DELETE /films/:id**  
  Deletes a film from the database by ID.

- **PUT /films/:id**  
  Updates an existing film in the database by ID.

### Category Routes

- **GET /category**  
  Returns a full list of categories in the database.

- **GET /category/:id**  
  Returns a single category by ID.

- **POST /category**  
  Adds a new category to the database.

- **DELETE /category/:id**  
  Deletes a category from the database by ID.

- **PUT /category/:id**  
  Updates an existing category in the database by ID.