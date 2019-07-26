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

