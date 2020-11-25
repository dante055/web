const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate.js');
const { success, error } = require('./modules/response.js');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname == '/' || pathname == '/overview') {
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    success(res, 'text/html', output);
  } else if (pathname === '/product' && query.id && query.id < dataObj.length) {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    success(res, 'text/html', output);
  } else if (pathname === '/api') {
    if (query.id && query.id < dataObj.length) {
      // http://127.0.0.1:8000/api?id=
      const output = JSON.stringify(dataObj[query.id]);
      success(res, 'application/json', output);
    } else {
      success(res, 'application/json', data);
    }
  } else {
    error(res);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
