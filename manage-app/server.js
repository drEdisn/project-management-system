const express = require('express');
const path = require('path');
const server = express();
require('dotenv').config();
const port = process.env.SERVER_PORT || 4200;

server.use(express.static(__dirname + '/dist/manage-app'));
server.get('/*', (_, res) => res.sendFile(path.join(__dirname + '/dist/manage-app/index.html')));

server.listen(port, () => console.log(`Server started in http://localhost:${port}`));