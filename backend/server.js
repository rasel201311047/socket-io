const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

let users = []; // { username }
let sockets = {}; // username: socket.id

app.post('/api/register', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });
  if (users.includes(username)) return res.status(400).json({ error: 'User exists' });
  users.push(username);
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });
  if (!users.includes(username)) return res.status(400).json({ error: 'User not found' });
  res.json({ success: true });
});

app.get('/api/users', (req, res) => {
  res.json({ users });
});

// Socket.IO for messaging and calls
io.on('connection', (socket) => {
  socket.on('join', (username) => {
    socket.username = username;
    sockets[username] = socket.id;
    socket.emit('users', users.filter(u => u !== username)); // send other users
  });

socket.on('message', ({ to, message }) => {
  const toSocketId = sockets[to];
  if (toSocketId) {
    io.to(toSocketId).emit('message', { from: socket.username, to, message });
    socket.emit('message', { from: socket.username, to, message }); // echo to sender
  }
});

  socket.on('call', ({ to, type }) => {
    const toSocketId = sockets[to];
    if (toSocketId) {
      io.to(toSocketId).emit('call', { from: socket.username, type });
      socket.emit('call', { from: socket.username, type }); // echo to sender
    }
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      delete sockets[socket.username];
    }
  });
});

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});