const fs = require('fs');
const crypto = require('crypto');
const { time } = require('console');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log('Timer one finished'), 0); 
setImmediate(() => console.log('Immediate one finished')); 

fs.readFile('/2-how-node-works/starter/test-file.txt', () => {
  console.log('polling finished');
  console.log('_____________');
  setTimeout(() => console.log('Timer two finished'), 0); 
  setTimeout(() => console.log('Timer three finished'), 3000); 
  setImmediate(() => console.log('Immediate two finished'));
  process.nextTick(() => console.log('process.nextTick finished')); 

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeRequired = Date.now() - start;
    console.log('password ecrypted in ' + timeRequired + ' seconds');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeRequired = Date.now() - start;
    console.log('password ecrypted in ' + timeRequired + ' seconds');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeRequired = Date.now() - start;
    console.log('password ecrypted in ' + timeRequired + ' seconds');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeRequired = Date.now() - start;
    console.log('password ecrypted in ' + timeRequired + ' seconds');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeRequired = Date.now() - start;
    console.log('password ecrypted in ' + timeRequired + ' seconds');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeRequired = Date.now() - start;
    console.log('password ecrypted in ' + timeRequired + ' seconds');
  });
});

console.log('Hello from the top level code'); //                         #1
