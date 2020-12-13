var openWeatherCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
var openWeatherIconUrl = 'https:///openweathermap.org/img/w/';
var citySearch = '?q=herriman';
var openAPIKey = '&appid=199161a7849c135f147382ffb92ba10d';
var dateFormat = 'MM/DD/YYYY';
var cityObj = [];

// var currentWeatherEl = document.getElementById('currentWeather');

// var currentWeatherEl = document.getElementById('currentWeather');
// var currentDateEl = document.getElementById('currentDate');
// var currentIconEl = document.getElementById('currentIcon');


var getCurrentWeather = function () {
    var currentUrl = openWeatherCurrentUrl + citySearch + openAPIKey;
    console.log(currentUrl);
    fetch(currentUrl)
        .then(function (currentResponse) {
            // request was successful
            if (currentResponse.ok) {
                return currentResponse.json();

            }
            else {
                alert('Error: ' + response.statusText);
            }
        })
        .then(function(currentResponse) {
            console.log(currentResponse);
            var location = currentResponse.name;
            console.log(location);
            var date = currentResponse.dt;
            console.log(date);
            var convertedDate = moment.unix(date).format(dateFormat);
            console.log(convertedDate);
            var weatherIcon = currentResponse.weather[0].icon;
            console.log(weatherIcon);
            
            cityObj.push ({
                cityName: location,
                cityDate: convertedDate,
                cityIcon: weatherIcon
            });
            console.log(cityObj);

            var currentDiv = $('<div>')
                .addClass('border p-3')
            
            var currentName = $('<h3>')
                .addClass('d-inline')
                .text(cityObj[0].cityName);
                
            
            var currentDate = $('<h3>')
                .addClass('d-inline')
                .text(' (' + cityObj[0].cityDate + ')');
            
            var currentIcon = $('<img>')
                .attr('src', openWeatherIconUrl + cityObj[0].cityIcon + '.png');
            
            currentDiv
                .append(currentName)
                .append(currentDate)
                .append(currentIcon);
            
            $('.currentWeather')
                .append(currentDiv);
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
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