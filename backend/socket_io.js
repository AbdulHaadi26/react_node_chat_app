
module.exports = function (server) {
    let users = [];

    var io = require('socket.io')(server, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        socket.on('connected', (data) => {
            console.log('User Connected', data);
            users[data] = socket.id;
        });

        socket.on('send', (data) => {
            users[data.reciever] && io.to(users[data.reciever]).emit('message', data);
        });

        socket.on('typing', (data) => {
            users[data.reciever] && io.to(users[data.reciever]).emit('isTyping', data.value);
        });

        socket.on('disconnected', (data) => {
            console.log('User Disconnected', data);
            users[data] = null;
        });

    });
}