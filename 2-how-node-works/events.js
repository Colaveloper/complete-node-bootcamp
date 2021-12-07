const http = require('http');

////////////////////////
// Emitting an event  //
////////////////////////

// const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

// myEmitter.on('EventName', () => {
//   console.log('event has took place!');
// });
// myEmitter.on('EventName', (other) => {
//   console.log(`You can even pass ${other}`);
// });

// myEmitter.emit('EventName', 'additional data');

//////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('request received');
  res.end('request received');
});

server.on('close', (req, res) => {
  console.log('server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('waiting for requests');
});
