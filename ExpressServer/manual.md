# GA01 - RESTful API - Group 09 - Manual

## Group Information
- **21127092** - Trần Hoàng Lâm
- **21127147** - Võ Anh Quân
- **21127151** - Nguyễn Nhật Quang
- **21127629** - Trần Minh Khoa

## Technologies Applied
- **ExpressJS**
- **Knex**

## Prerequisites
- Have **MySQL** installed on your system.
- The **sakila** database must be imported to your MySQL.

## Installation Steps

1. **Open the Project**  
   Navigate to the submitted folder and open it in any IDE (e.g., VSCode).

2. **Install Required Packages**  
   Open the Terminal and run the following command to install all required packages:
   ```
   npm install
   ```

3. **Configure Database Connection**  
   Navigate to the `database.js` file located at `./src/database.js`.  
   Modify the Knex connection configurations to match your MySQL server settings.

4. **Start the Server**  
   In the Terminal, execute the following command to start the server:
   ```
   npm start
   ```

5. **Test API Endpoints**  
   Use any API testing tool (e.g., Postman) to test the available endpoints.

   ### Endpoints for Actor Table
   All actor-related endpoints start with `/actor` as the base path.

   - **GET /actor**  
     Returns a full list of actors in the database.
   
   - **GET /actor/:id**  
     Returns a single actor whose ID matches the one in the database.
   
   - **POST /actor**  
     Adds a new actor to the database.
   
   - **DELETE /actor/:id**  
     Deletes actor(s) from the database whose ID matches the one in the database.
   
   - **PUT /actor/:id**  
     Updates actor(s) whose ID matches the one in the database.