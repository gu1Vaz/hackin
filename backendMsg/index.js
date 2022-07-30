const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser,setNameUser,removeUser,getUser,getUsersInRoom,addRoom,inRoom,leaveRoom,getSalas } = require('./usersAndrooms');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(router);


io.on('connection',(socket)=>{
  //User
  socket.on("connct",([name],callback)=>{
    const { error, user } = addUser({ id: socket.id, name });
    if(error) return callback(error);
    callback();
  });
  socket.on("set_name",([name],callback)=>{
    const { error, success } = setNameUser({ id: socket.id, name });
    if(error) return callback(["error",error]);
    if(success) return callback(["success",success]);
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      socket.broadcast.emit('listData', {user: 'admin', rooms: getSalas() }); 
    }
  });
  //Salas
  socket.on("join",([room],callback)=>{
    const { error, user } = inRoom({ id: socket.id, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!` });
    socket.broadcast.emit('listData', {user: 'admin', rooms: getSalas() });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    

    callback();
  });
  socket.on("create",([room,max],callback)=>{
    const { error, sala } = addRoom({id:socket.id,room,max });

    if(error) return callback(error);

    socket.join(sala.nome);
    socket.emit('message', { user: 'admin', text: `Sua sala foi criada, bem vindo a ${sala.nome}.`});
    socket.broadcast.emit('listData', {user: 'admin', rooms: getSalas() });
    io.to(sala.nome).emit('roomData', { room: sala.nome, users: getUsersInRoom(sala.nome) });
    
  });
  socket.on("leave",(callback)=>{
    const { error, user, sala} = leaveRoom({ id: socket.id });

    if(error) return callback(error);
    socket.leave(sala);
    
    io.to(sala).emit('message', { user: 'admin', text: `${user.name} has left.` });
    io.to(sala).emit('roomData', { room: sala, users: getUsersInRoom(sala)});
    socket.broadcast.emit('listData', {user: 'admin', rooms: getSalas() });
  });
  //Messages
  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
  });
  
});




server.listen( 8090, () => console.log(`Server has started.`));