// setup URL's for openWeatherApi
var openWeatherCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
var openWeatherOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall';
var openWeatherIconUrl = 'https:///openweathermap.org/img/w/';

// setup units and excludes
var openWeatherUnits = '&units=imperial';
var openWeatherExclude = '&exclude=hourly,minutely,alerts'
var openWeatherUVI = 'https://api.openweathermap.org/data/2.5/uvi';
var citySearch = '';

// OpenAPIKey
var openAPIKey = '&appid=199161a7849c135f147382ffb92ba10d';

// date formating
var dateFormat = 'MM/DD/YYYY';

// Lat and Lon
var currentLat = '';
var currentLon = '';

// local storage
var searchedCity = [];

// get elements for the current weather
var currentLocationEl = document.getElementById('currentLocation');
var currentDateEl = document.getElementById('currentDate');
var currentTempEl = document.getElementById('currentTemp');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentWindEl = document.getElementById('currentWind');
var currentUVIEl = document.getElementById('currentUVI');
var citySearchedEl = document.getElementById('citySearched');

// get element user-form
var userFormEl = document.getElementById('citySearch');
var searchedCityEl = document.getElementById('citySearched');

// get elemet for the forecast weather cards
var forecastCardsEl = document.getElementById('forecast-cards');

var getCurrentWeather = function (event) {
    var currentUrl = openWeatherCurrentUrl + '?q=' + citySearch + openWeatherUnits + openAPIKey;
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
            currentLat = '?lat=' + currentResponse.coord.lat;
            currentLon = '&lon=' + currentResponse.coord.lon;

        })
        // get and set UV index
        .then(function () {
            // set currentUVIUrl to fetch UV index
            var currentUVIUrl = openWeatherUVI + currentLat + currentLon + openAPIKey;
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
        // get and set forecast
        .then(function () {
            var oneCallUrl = openWeatherOneCallUrl + currentLat + currentLon + openWeatherExclude + openWeatherUnits + openAPIKey;
            fetch(oneCallUrl)
                .then(function (openWeatherOneCallResponse) {
                    // request was successful
                    if (openWeatherOneCallResponse.ok) {
                        return openWeatherOneCallResponse.json();
                    } else {
                        alert('Error: ' + openWeatherOneCallResponse.statusText);
                    }
                })
                .then(function (openWeatherOneCallResponse) {
                    for (var i = 1; i < openWeatherOneCallResponse.daily.length - 2; i++) {

                        // create forecast card
                        var forcastCard = $('<div>')
                            .addClass('card');

                        // get and set forecast date header
                        var convertedDate = moment.unix(openWeatherOneCallResponse.daily[i].dt).format(dateFormat);
                        var forecastHeader = $('<div>')
                            .addClass('card-header')
                            .text(convertedDate);

                        // get and set forecast icon
                        var weatherIcon = openWeatherOneCallResponse.daily[i].weather[0].icon;
                        var forecastIcon = $('<img>')
                            .addClass('card-title')
                            .attr('src', openWeatherIconUrl + weatherIcon + '.png')
                            .attr('width', '100px')
                            .attr('height', '100px');

                        // get and set forecast temp
                        var weatherTemp = Math.floor(openWeatherOneCallResponse.daily[i].temp.day);
                        var forecastTemp = $('<p>')
                            .addClass('card-text')
                            .text('Temperature: ' + weatherTemp + ' ' + String.fromCharCode(176) + 'F');

                        // get and set forecast humidity
                        var weatherHumidity = openWeatherOneCallResponse.daily[i].humidity;
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
        })

        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};

var loadTasks = function () {
    // get itmes from localStorage
    searchedCity = JSON.parse(localStorage.getItem('searchedCity'));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!searchedCity) {
        searchedCity = []
        return;
    }

    // loop through the items to place a button for each city
    for (i = 0; i < searchedCity.length; i++) {
        var cityBtn = $('<button>')
            .addClass('btn bg-info m-1')
            .attr('id', searchedCity[i])
            .html(searchedCity[i]);

        $('#citySearched')
            .append(cityBtn);
    }
};

var searchCity = function (event) {
    event.preventDefault();
    // console.log(event);
    $('#forecast-cards').html('');
    citySearch = document.getElementById('cityInput').value;
    document.getElementById('cityInput').value = '';
    if ($.inArray(citySearch, searchedCity) != -1) {
        // console.log('yes');
    } else {
        var currentUrl = openWeatherCurrentUrl + '?q=' + citySearch + openWeatherUnits + openAPIKey;
        fetch(currentUrl)
            .then(function (currentResponse) {
                // request was successful
                if (currentResponse.ok) {
                    // console.log('no');
                    searchedCity.push(citySearch);
                    localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
                    var cityBtn = $('<button>')
                        .addClass('btn bg-info m-1')
                        .attr('id', citySearch)
                        .html(citySearch);

                    $('#citySearched')
                        .append(cityBtn);

                    getCurrentWeather(event);
                } else {
                    location.reload();
                    alert('Error: No City Found');
                }
            })
    }

};

var searchedCityList = function (event) {
    event.preventDefault();
    var targetEl = event.target;
    if (targetEl.matches('.btn')) {
        var cityID = $(targetEl).attr('id');
        citySearch = cityID;
    }
    getCurrentWeather(event);
};

userFormEl.addEventListener('click', searchCity);
searchedCityEl.addEventListener('click', searchedCityList);
loadTasks();