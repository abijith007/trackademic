const express = require('express');
const app = express();
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
const axios = require('axios');
require('dotenv').config({ path: envPath });
const cors = require('cors');
const multer = require('multer');
const { request } = require('http');
const upload = multer();

app.use(cors({origin: process.env.REACT_SERVICE, credentials: true}));
app.use(express.json());

app.use('/users', (req, res, next) => {
  const apiUrl = 'http://localhost:4001' + req.originalUrl;    
  axios({
    method: req.method,
    url: apiUrl,
    data: req.body,
    headers: {...req.headers}
  })
  .then(response => {    
    res.status(response.status).set(response.headers).send(response.data);
  })
  .catch(error => {    
    if (error.response) {
      res.status(error.response.status).set(error.response.headers).send(error.response.data);
    } else {
      console.error('API Gateway error:', error);
      res.status(500).send('Internal Server Error');
    }
  });  
});

app.use('/issues', (req, res, next) => {
  const apiUrl = 'http://localhost:4002' + req.originalUrl;    
  axios({
    method: req.method,
    url: apiUrl,
    data: req.body,
    headers: {...req.headers}
  })
  .then(response => {    
    res.status(response.status).set(response.headers).send(response.data);
  })
  .catch(error => {    
    if (error.response) {
      res.status(error.response.status).set(error.response.headers).send(error.response.data);
    } else {
      console.error('API Gateway error:', error);
      res.status(500).send('Internal Server Error');
    }
  });  
});

app.use('/chatbot', (req, res, next) => {
  const apiUrl = 'http://localhost:4003' + req.originalUrl;    
  axios({
    method: req.method,
    url: apiUrl,
    data: req.body,
    headers: {...req.headers}
  })
  .then(response => {    
    console.log(response.data, response.status);
    res.status(response.status).set(response.headers).send(response.data);
  })
  .catch(error => {    
    if (error.response) {
      res.status(error.response.status).set(error.response.headers).send(error.response.data);
    } else {
      console.error('API Gateway error:', error);
      res.status(500).send('Internal Server Error');
    }
  });  
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
