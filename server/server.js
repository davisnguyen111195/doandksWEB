const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.port || 80;
const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
  
io.on('connection', (socket) => {
    console.log('A new user just connected');

    socket.on('onClick', () => {
        socket.broadcast.emit('MOTOR', 500)
        console.log('500');    
    })
    
    
    socket.on('disconnect', () => {
        console.log('disconnect');
    })

    
}); 




server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})