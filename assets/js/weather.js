var openWeatherCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
var citySearch = '?q=herriman';
var openAPIKey = '&appid=199161a7849c135f147382ffb92ba10d'


var getCurrentWeather = function() {
    var currentUrl = openWeatherCurrentUrl + citySearch + openAPIKey;
    console.log(currentUrl);
    fetch(currentUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);

      } 
      else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to GitHub');
    });
};

var getForecastWeather = function() {
    var forecastUrl = openWeatherForecastUrl + citySearch + openAPIKey;
    console.log(forecastUrl);
    fetch(forecastUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);

      } 
      else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to GitHub');
    });
};

getCurrentWeather();
getForecastWeather();