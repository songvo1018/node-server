const https = require('https');
const app = require('./app');
const port = 5000;

const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};


const server = https.createServer(options, app)

server.listen(port)