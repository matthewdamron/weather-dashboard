var openWeatherCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
var openWeatherUnits = '&units=imperial';
var openWeatherUVI = 'https://api.openweathermap.org/data/2.5/uvi';
var openWeatherIconUrl = 'https:///openweathermap.org/img/w/';
var citySearch = '?q=herriman';
var openAPIKey = '&appid=199161a7849c135f147382ffb92ba10d';
var dateFormat = 'MM/DD/YYYY';
var cityObj = [];

var currentLocationEl = document.getElementById('currentLocation');
var currentDateEl = document.getElementById('currentDate');
// var currentIconEl = document.getElementById('currentIcon');
var currentTempEl = document.getElementById('currentTemp');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentWindEl = document.getElementById('currentWind');
var currentUVIEl = document.getElementById('currentUVI');

var getCurrentWeather = function () {
    var currentUrl = openWeatherCurrentUrl + citySearch + openWeatherUnits + openAPIKey;
    console.log(currentUrl);
    fetch(currentUrl)
        .then(function (currentResponse) {
            // request was successful
            if (currentResponse.ok) {
                return currentResponse.json();
            } else {
                alert('Error: ' + currentResponse.statusText);
            }
        })
        .then(function (currentResponse) {
            // get and set current location
            var currentLocation = currentResponse.name;
            currentLocationEl.textContent = currentLocation;

            // get and set current date
            var currentDate = currentResponse.dt;
            var convertedDate = moment.unix(currentDate).format(dateFormat);
            currentDateEl.textContent = ' (' + convertedDate + ')';

            // get and set current icon
            var weatherIcon = currentResponse.weather[0].icon;
            $('#currentIcon')
                .attr('src', openWeatherIconUrl + weatherIcon + '.png');

            // get and set current temp
            var currentTemp = Math.floor(currentResponse.main.temp);
            currentTempEl.textContent = 'Temperature: ' + currentTemp + ' ' + String.fromCharCode(176) + 'F';

            // get and set current humidity
            var currentHumidity = currentResponse.main.humidity;
            currentHumidityEl.textContent = 'Humidity: ' + currentHumidity + ' %';

            // get and set current wind
            var currentWind = Math.floor(currentResponse.wind.speed);
            currentWindEl.textContent = 'Wind Speed: ' + currentWind + ' MPH';

            // get current latitude and longitude
            var currentLat = currentResponse.coord.lat;
            var currentLon = currentResponse.coord.lon;

            // set currentUVIUrl to fetch UV index
            var currentUVIUrl = openWeatherUVI + '?lat=' + currentLat + '&lon=' + currentLon + openAPIKey;
            console.log(currentUVIUrl);
            fetch(currentUVIUrl)
                .then(function (currentUVIResponse) {
                    if (currentUVIResponse.ok) {
                        return currentUVIResponse.json();
                    } else {
                        alert('Error: ' + currentUVIResponse.statusText);
                    }
                })
                .then(function (currentUVIResponse) {
                    // get and set current UV index
                    var currentUVI = currentUVIResponse.value;
                    currentUVIEl.textContent = 'UV Index: ' + currentUVI;
                })
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};

var setupCurrentWeather = function (currentResponse, currentUVIResponse) {

};

var getForecastWeather = function () {
    var forecastUrl = openWeatherForecastUrl + citySearch + openAPIKey;
    console.log(forecastUrl);
    fetch(forecastUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);

            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};

getCurrentWeather();
// getForecastWeather();