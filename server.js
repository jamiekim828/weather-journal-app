// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Setup Server
const port = 8000;

// Callback to debug
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

var corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true
};

// Cors for cross origin allowance
app.use(cors(corsOptions));

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Post Route
app.post('/add', addData);

function addData(req, res) {
  console.log('req.body', req.body);
  const newData = {
    date: req.body.date,
    city: req.body.city,
    country: req.body.country,
    description: req.body.description,
    temperature: req.body.temp,
    humidity: req.body.humidity,
    content: req.body.content
  };
  res.send(newData);
  projectData = newData;
  console.log('after post projectData', projectData);
}

// GET '/all'
app.get('/all', getProjectData);

function getProjectData(req, res) {
  res.send(projectData);
  console.log('server get', projectData);
}
