const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const chatNameSpace = io.of('/chat');

chatNameSpace.on('connection', (socket) => {
  const name = socket.handshake.query.name|| 'Anonymous';
  socket.emit("connection", { name });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    chatNameSpace.to(room).emit('message', { user: 'System', message: `${name} joined the room` });
  });
  socket.on('message', (data) => {
    chatNameSpace.to(data.room).emit('message', { user: name, message: data.message });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
