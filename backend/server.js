const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// const port = normalizePort(process.env.PORT || '3000');
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
// //----------------------------------------------------------------------------------
// let express = require('express'),
//     mongoose = require('mongoose'),
//     cors = require('cors'),
//     bodyParser = require('body-parser')

// const api = require('../backend/routes/postRoute')

// // Connexion à la base de donnée
// require('dotenv').config()
// require("./services/db");

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(cors());

// app.use('/images', express.static('images'));

// app.use('/api', api)

// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

// app.use((req, res, next) => {
//     // Error goes via `next()` method
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });

// app.use(function (err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// });