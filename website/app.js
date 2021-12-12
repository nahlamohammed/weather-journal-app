/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let todayDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

// Base URL & params of weather api
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
// Personal API Key for OpenWeatherMap API
const apiKey = '2dc5e8f751a0e40ad4850b184e14746a';
//For temperature in Celsius
const unit = 'metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    if (!zipCode) {
        alert('Please, Enter a zipCode.');
    } else {
        const feelings = document.getElementById('feelings').value;
        getTemperatureByZipCode(`${baseURL}?zip=${zipCode}&appid=${apiKey}&units=${unit}`)
            .then(function (data) {
                addWeatherInfo('/weatherInfo', { temp: data.main.temp, feelings: feelings, date: todayDate });
            }).then(function () {
                updateUI();
            })
    }
}

/* Function to GET data */
const getWeatherInfo = async (URL) => {
    const request = await fetch(URL);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to UPDATE UI */
const updateUI = () => {
    getWeatherInfo('/weatherInfo').then(function (data) {
        document.getElementById('temp').innerHTML = `${data.temp} °C`;
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('content').innerHTML = data.feelings;

        document.getElementById('zip').value = '';
        document.getElementById('feelings').value = '';
    })
}

/* Function to GET Web API Data*/
const getTemperatureByZipCode = async (fullURL) => {
    const res = await fetch(fullURL)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const addWeatherInfo = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}