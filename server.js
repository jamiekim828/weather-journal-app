// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

// to solve cors error???
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  next();
});

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Callback to debug
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// GET '/all'
app.get('/all', getProjectData);

function getProjectData(req, res) {
  console.log('req', req, 'res', res);
  res.send(projectData);
}

// Post Route
app.post('/adddata', addData);

function addData(req, res) {
  console.log(req.body);
  const newData = {
    date: req.body.date,
    temperature: req.body.temp,
    content: req.body.content
  };
  Object.assign(projectData, newData);
  console.log(projectData);
}
