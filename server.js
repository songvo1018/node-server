const http = require('http');
const app = require('./app');
const port = 5000;

// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };


const server = http.createServer(app)

server.listen(port)