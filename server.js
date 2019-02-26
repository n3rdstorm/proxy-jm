const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/:productId', express.static(path.join(__dirname, 'public')));

const proxyTable = {
  '/products': 'http://ec2-3-83-95-221.compute-1.amazonaws.com',
  '/recently-viewed': 'http://ec2-3-17-36-143.us-east-2.compute.amazonaws.com/',
  '/reviews': 'http://ec2-18-188-165-52.us-east-2.compute.amazonaws.com'
}

const options = {
  target: '/',
  router: proxyTable
}

const myProxy = proxy(options);

app.use(myProxy);

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
});