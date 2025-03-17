const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('Um usuário conectou:', socket.id);

  socket.on('chat message', (data) => {
    console.log('Mensagem recebida:', data);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formato HH:MM
    io.emit('chat message', { 
      username: data.username, 
      message: data.message, 
      timestamp: timestamp // Certifique-se de que o timestamp está sendo enviado
    });
  });

  socket.on('disconnect', () => {
    console.log('Um usuário desconectou:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});