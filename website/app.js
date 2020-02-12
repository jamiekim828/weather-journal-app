/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '1862b1e2691580e29648e17d562981f8';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  const newZip = document.getElementById('zip').value;
  const newTemp = document.getElementById('temp').value;
  const newFeeling = document.getElementById('feelings').value;

  getWeather(baseUrl, newZip, apiKey).then(function(data) {
    console.log(data);
    postWeather('/adddata', {
      date: newDate,
      newZip,
      newTemp,
      newFeeling
    });
  });
}

/* Function to GET Web API Data*/
const getWeather = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl + zip + '&appid=' + apiKey);
  try {
    const data = await res.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();
    console.log('postWeather');
    console.log('newData', newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to update UI */
// const updateUI = async () => {
//   const req = await fetch('/all');
//   try {
//     const allData = await req.json();
//     console.log('allData', allData);
//     document.getElementById('date').innerHTML = allData.date;
//     document.getElementById('city').innerHTML = allData.name;
//     // document.getElementById('temp').innerHTML = '';
//     // document.getElementById('content').innerHTML = '';
//   } catch (error) {
//     console.log('error', error);
//   }
// };
