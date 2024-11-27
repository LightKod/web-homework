# GA05 - MESSAGE QUEUE - Group 09 - Manual

## Group Information
- **21127092** - Trần Hoàng Lâm
- **21127147** - Võ Anh Quân
- **21127151** - Nguyễn Nhật Quang
- **21127629** - Trần Minh Khoa

## Technologies Applied
- **ExpressJS**
- **AMQP (RabbitMQ)**
- **Docker**

## Prerequisites
- **Docker** installed on your system.
- **RabbitMQ** container running with the **management plugin** enabled. You can set it up using the following command:
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```

## Installation Steps

1. **Open the Project**  
   Navigate to the submitted folder and open it in an IDE (e.g., VSCode).

2. **Install Required Packages**  
   Open the Terminal and run the following command to install all required packages for both the server and the client:
   ```bash
   npm install
   ```
3. **Navigate into the src folder**
    ```bash
      cd src
    ```
4. **Start the Server**  
**Request/Reply Pattern**
  1. **Start the Server (Responder)**  
  ```bash
   node request-reply/server.js
   ```
  2. **Start the Client (Requester)**  
  ```bash
   node request-reply/client.js
   ```
**Publish/Subscribe Pattern**
  1. **Start the Publisher**  
  ```bash
   node pub-sub/emit_log.js
   ```
  2. **Start the Subscribers (You can start multiple instances)**  
  ```bash
   node pub-sub/receive_log.js
   ```
**Remote Procedure Call (RPC) Pattern**
  1. **Start the RPC Server**  
  ```bash
   node rpc/server.js
   ```
  2. **Start the RPC Client**  
  ```bash
   node rpc/client.js
  ```


