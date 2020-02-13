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

// to solve cors error???
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// GET '/all'
app.get('/all', getProjectData);

function getProjectData(req, res) {
  res.send(projectData);
}

// Post Route
app.post('/adddata', addData);

function addData(req, res) {
  // console.log('req.body', req.body);
  const newData = {
    date: req.body.date,
    city: req.body.city,
    temperature: req.body.temp,
    content: req.body.content
  };
  res.send(newData);
}
