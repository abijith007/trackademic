const express = require('express');
const app = express();
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
const axios = require('axios');
require('dotenv').config({ path: envPath });
const cors = require('cors');

app.use(cors({origin: process.env.REACT_SERVICE, credentials: true}));
app.use(express.json());

app.use('/users', (req, res, next) => {
  const apiUrl = 'http://localhost:4001' + req.originalUrl;    
  axios({
    method: req.method,
    url: apiUrl,
    data: req.body
  })
  .then(response => {
    // console.log(response);
    res.send(response.data);
  })
  .catch(error => {    
    res.status(error.response.status).send(error.response.data);
  });  
});

app.use('/issues', (req, res, next) => {
  const apiUrl = 'http://localhost:4002' + req.originalUrl;
  console.log(apiUrl, req.body, req.method);
  axios({
    method: req.method,
    url: apiUrl,
    data: req.body
  })
  .then(response => {
    res.send(response.data);
  })
  
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
