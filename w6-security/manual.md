# GA04 - Security  - Group 09 - Manual

## Group Information
- **21127092** - Trần Hoàng Lâm
- **21127147** - Võ Anh Quân
- **21127151** - Nguyễn Nhật Quang
- **21127629** - Trần Minh Khoa

## Technologies Applied
- **ExpressJS**
- **Knex**
- **sequelize**

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
   Start ServerA and ServerB:
   In the Terminal, execute the following command to start the server and the client:
   ```
   npm start
   ```

## Endpoints

### Server A
- **GET /actor**  
  Retrieves the list of actors from the database.

- **GET /films**  (Have protectRoute must login before)
  Retrieves movie list from server B
- **POST /auth/login**
  Login to receive accessToken and refreshToken.
- **POST /auth/register**
  Register a new user with username, password, and email.
- **POST /auth/refresh-token**
  Request a new accessToken using refreshToken.


### Server B
- **GET /films**
  Retrieves the list of movies from the database.
