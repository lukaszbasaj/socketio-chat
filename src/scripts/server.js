const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;
var path = require('path');
var favicon = require('serve-favicon');

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.static(path.join('public')));
app.use(favicon(path.join('public', 'favicon.ico')));

const users = 0;

io.on('connection', (socket) => {
    const addedUser = false;

    socket.on('new message', (data) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data,
        });
    });

    socket.on('add user', (username) => {
        if (addedUser) return;

        socket.username = username;
        ++users;
        addedUser = true;

        socket.emit('login', {
            users
        });

        socket.broadcast.emit('user joined', {
            username: socket.username,
            users,
        });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username,
        });
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username,
        });
    });

    socket.on('disconnect', () => {
        if(addedUser) {
            --users;

            socket.broadcast.emit('user left', {
                username: socket.username,
                users,
            });
        }
    });

});