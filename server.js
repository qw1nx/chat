const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req,res) => {
    res.send('hello world');
})

let userList = new Map();

io.on('connection', (socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    socket.on('message',(msg) => {
        socket.broadcast.emit('message-broadcast', {
            message: msg,
            userName: userName
        });
    })

    socket.on('disconnect', (reason)=> {
        removeUser(userName, socket.id)
    })
});

function addUser(username, id){
    if (!userList.has(username)){
        userList.set(username, new Set(id))
    } else {
        userList.get(username).add(id);
    }
}

function removeUser(username, id){
    if(userList.has(username)){
        let userIds = userList.get(username);
        if(userIds.size == 0){
            userList.delete(username);
        }
    }
}

http.listen(3000, ()=> {
    console.log('server is running')
})
