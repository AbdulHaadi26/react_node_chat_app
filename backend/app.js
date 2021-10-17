const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

const mongoURI = `mongodb://localhost:27017/chat`

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err) {
    if (err) console.log(err)
    else console.log('Connected to MongoDB');
});

let server = http.createServer(app)

server.listen(80);


require('./socket_io')(server);
app.use('/user', require('./routes/users'));
app.use('/chat', require('./routes/messages'));