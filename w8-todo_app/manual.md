# GA08 - TODO APP - Group 09 - Manual

## Group Information
- **21127092** - Trần Hoàng Lâm
- **21127147** - Võ Anh Quân
- **21127151** - Nguyễn Nhật Quang
- **21127629** - Trần Minh Khoa

## Technologies Applied
- **NextJS (ReactJS)**

## Installation Steps

1. **Open the Project**  
   Navigate to the submitted folder and open it in an IDE (e.g., VSCode).

2. **Install Required Packages**  
   Open the Terminal and run the following command to install all required packages:
   ```bash
   pnpm install
   ```

3. **Start the Server**  
   In the Terminal, execute the following command to start the NextJS server:
   ```
   pnpm dev
   ```

## Versions

### Version 1
- **Endpoint**: localhost:3000/
- **React components path**: .\todo_app\app\ui\version_1
- **Features**: 
   - Implemented a simple todo app with some basic operations: add, delete, mark as completed/incomplete and filter.
   - Managed states using useState in which functions to control states are passed as props between components.

### Version 2
- **Endpoint**: localhost:3000/version-2
- **React components path**: .\todo_app\app\ui\version_2
- **Features**: 
   - Reduced the amount of functions to manage the state of tasks by using useReducer.
   - Eliminated the need of passing props between components with createContext and useContext.
