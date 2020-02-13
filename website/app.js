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
  const newFeeling = document.getElementById('feelings').value;

  getWeather(baseUrl, newZip, apiKey)
    .then(function(data) {
      console.log('19', data);
      postWeather('/adddata', {
        date: newDate,
        city: data.name,
        country: data.sys.country,
        weather: data.weather[0].description,
        temp: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        content: newFeeling
      });
    })
    .then(updateUI());
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
const postWeather = async (url = '/adddata', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();

    console.log('58', newData);
    // return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// /* Function to update UI */
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    console.log('allData', allData);
    document.getElementById(
      'date'
    ).innerHTML = `<h4>Date</h4><p>(mm/dd/yyyy)</p>${allData.date}`;
    document.getElementById('city').innerHTML = `<h4>City</h4>${allData.city}`;
    document.getElementById(
      'temp'
    ).innerHTML = `<h4>Temperature(F)</h4>${allData.temperature}`;
    document.getElementById(
      'content'
    ).innerHTML = `<h4>Feeling</h4>${allData.content}`;
  } catch (error) {
    console.log('error', error);
  }
};
