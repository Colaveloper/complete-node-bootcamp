const fs = require('fs');
const http = require('http');
const url = require('url');
// const slugify = require('slugify'); // Unused
const replaceTemplate = require('./modules/replaceTemplate');

// blocking code executed only once at the beginning,
// which reads the json and saves it in a const
const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf8'
);
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf8');
const tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf8'
);

const data = fs.readFileSync('./dev-data/data.json', 'utf8');
const dataObj = JSON.parse(data); //array of products

// // slugify
// const slugs = dataObj.map(el => console.log(slugify(el.productName, { lower: true })));

const server = http.createServer(function (req, res) {
  var { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname == '/' || pathname == '/overview') {
    res.writeHead(404, { 'content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname == '/product') {
    res.writeHead(404, { 'content-type': 'text/html' });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if ((pathname = '/api')) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);

    // 404
  } else {
    res.writeHead(404, { 'content-type': 'text/html', 'my-header': 'my-data' });
    res.end('<h1>Page not found</h1>');
  }
}); // reacts to the request, responds with thats string

const port = 8000; //subsection of the host 127.0.0.1

server.listen(port, '127.0.0.1', () => {
  console.log('listening on port ' + port);
}); // listens to the request of opening the server
