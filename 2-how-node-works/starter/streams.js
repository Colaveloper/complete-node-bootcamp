const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Simple way (for small files)
  //
  //   fs.readFile('test-file.txt', 'utf8', (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });
  ////////////////////////////////////////////////////////////////
  // With streams
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => res.end());
  ////////////////////////////////////////////////////////////////
  // With streams and pipe operator
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
