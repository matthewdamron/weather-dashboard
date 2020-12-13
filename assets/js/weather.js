var openWeatherCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
var openWeatherOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall';
var openWeatherUnits = '&units=imperial';
var openWeatherUVI = 'https://api.openweathermap.org/data/2.5/uvi';
var openWeatherIconUrl = 'https:///openweathermap.org/img/w/';
var citySearch = '?q=herriman';
var openAPIKey = '&appid=199161a7849c135f147382ffb92ba10d';
var dateFormat = 'MM/DD/YYYY';
var cityObj = [];

// get elements for the current weather
var currentLocationEl = document.getElementById('currentLocation');
var currentDateEl = document.getElementById('currentDate');
var currentTempEl = document.getElementById('currentTemp');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentWindEl = document.getElementById('currentWind');
var currentUVIEl = document.getElementById('currentUVI');

// get elemet for the forecast weather
var forecastCardsEl = document.getElementById('forecast-cards');

var getCurrentWeather = function () {
    var currentUrl = openWeatherCurrentUrl + citySearch + openWeatherUnits + openAPIKey;
    // console.log(currentUrl);
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
            // console.log(currentUVIUrl);
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

var getForecastWeather = function () {
    var forecastUrl = openWeatherForecastUrl + citySearch + openWeatherUnits + openAPIKey;
    console.log(forecastUrl);
    fetch(forecastUrl)
        .then(function (forecastResponse) {
            // request was successful
            if (forecastResponse.ok) {
                return forecastResponse.json();
            } else {
                alert('Error: ' + forecastResponse.statusText);
            }
        })
        .then(function (forecastResponse) {
            console.log(forecastResponse);
            for (var i = 0; i < forecastResponse.list.length; i += 8) {
                console.log(forecastResponse.list[i].dt_txt);
                // var forecastDate = forecastResponse.dt_txt;
                // var convertedDate = moment(forecastResponse.list[i].dt_txt).format(dateFormat);
                // console.log(convertedDate);

                // create forecast card
                var forcastCard = $('<div>')
                    .addClass('card');

                // get and set forecast date header
                var convertedDate = moment(forecastResponse.list[i].dt_txt).format(dateFormat);
                console.log(convertedDate);
                var forecastHeader = $('<div>')
                    .addClass('card-header')
                    .text(convertedDate);

                // get and set forecast icon
                var weatherIcon = forecastResponse.list[i].weather[0].icon;
                console.log(weatherIcon);
                var forecastIcon = $('<img>')
                    .addClass('card-title')
                    .attr('src', openWeatherIconUrl + weatherIcon + '.png')
                    .attr('width', '100px')
                    .attr('height', '100px');

                // get and set forecast temp
                var weatherTemp = Math.floor(forecastResponse.list[i].main.temp);
                console.log(weatherTemp);
                var forecastTemp = $('<p>')
                    .addClass('card-text')
                    .text('Temperature: ' + weatherTemp + ' ' + String.fromCharCode(176) + 'F');

                // get and set forecast humidity
                var weatherHumidity = forecastResponse.list[i].main.humidity;
                console.log(weatherHumidity);
                var forecastHumidity = $('<p>')
                    .addClass('card-text')
                    .text('Humidity: ' + weatherHumidity + ' %');

                // append items to card
                forcastCard
                    .append(forecastHeader)
                    .append(forecastIcon)
                    .append(forecastTemp)
                    .append(forecastHumidity);

                // append card to card group
                $('#forecast-cards')
                    .append(forcastCard);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};

var oneCallApi = function () {
    var openWeatherOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely,alerts&appid=199161a7849c135f147382ffb92ba10d';
    console.log(openWeatherOneCallUrl);
    fetch(openWeatherOneCallUrl)
        .then(function (openWeatherOneCallResponse) {
            // request was successful
            if (openWeatherOneCallResponse.ok) {
                return openWeatherOneCallResponse.json();
            } else {
                alert('Error: ' + openWeatherOneCallResponse.statusText);
            }
        })
        .then(function (openWeatherOneCallResponse) {
            console.log(openWeatherOneCallResponse);
            for (var i = 1; i < openWeatherOneCallResponse.daily.length; i++) {
                // console.log(forecastResponse.list[i].dt_txt)
                // var forecastDate = forecastResponse.dt_txt;
                // var convertedDate = moment(forecastResponse.list[i].dt_txt).format(dateFormat);
                // console.log(convertedDate);

                // create forecast card
                var forcastCard = $('<div>')
                    .addClass('card');

                // get and set forecast date header
                var convertedDate = moment.unix(openWeatherOneCallResponse.daily[i].dt).format(dateFormat);
                console.log(convertedDate);
                var forecastHeader = $('<div>')
                    .addClass('card-header')
                    .text(convertedDate);

                // get and set forecast icon
                var weatherIcon = openWeatherOneCallResponse.daily[i].weather[0].icon;
                console.log(weatherIcon);
                var forecastIcon = $('<img>')
                    .addClass('card-title')
                    .attr('src', openWeatherIconUrl + weatherIcon + '.png')
                    .attr('width', '100px')
                    .attr('height', '100px');

                // get and set forecast temp
                var weatherTemp = Math.floor(openWeatherOneCallResponse.daily[i].temp.day);
                console.log(weatherTemp);
                var forecastTemp = $('<p>')
                    .addClass('card-text')
                    .text('Temperature: ' + weatherTemp + ' ' + String.fromCharCode(176) + 'F');

                // get and set forecast humidity
                var weatherHumidity = openWeatherOneCallResponse.daily[i].humidity;
                console.log(weatherHumidity);
                var forecastHumidity = $('<p>')
                    .addClass('card-text')
                    .text('Humidity: ' + weatherHumidity + ' %');

                // append items to card
                forcastCard
                    .append(forecastHeader)
                    .append(forecastIcon)
                    .append(forecastTemp)
                    .append(forecastHumidity);

                // append card to card group
                $('#forecast-cards')
                    .append(forcastCard);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};

getCurrentWeather();
// getForecastWeather();
oneCallApi();