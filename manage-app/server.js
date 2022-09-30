const express = require('express');
const path = require('path');
const server = express();

server.use(express.static(__dirname + '/dist/manage-app'));
server.get('/*', (_, res) => res.sendFile(path.join(__dirname + '/dist/manage-app/index.html')));

server.listen(4200);