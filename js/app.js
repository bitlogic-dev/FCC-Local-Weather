$(document).ready(function() {
  //create and set variables
  var units = 'imperial';
  var temp, tempUnit, htmlTemp, htmlTempUnit, lat, lon;
  //describe function for geolocation using IP address
  function getLocation() {
    return $.getJSON('https://ipinfo.io/json', function(data) {
      var locationData = data.loc.split(',');
      lat = parseFloat(locationData[0]);
      lon = parseFloat(locationData[1]);
    });
  }
  //describe function for retrieving weather data from API using coordinates
  function getWeather() {
    $.getJSON('//api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=' + units + '&APPID=daf287f74f0dd8c394d7fd3e4e554041', function(json) {
      var city = json.name;
      temp = Math.round(json.main.temp);
      var description = json.weather[0].description;
      var weatherIcon = json.weather[0].icon;
      tempUnit = '&#8457';
      htmlTempUnit = '<sup>&deg</sup>' + tempUnit;
      htmlTemp = '<p>' + temp + tempUnit + '</p>';
      var htmlIcon = '<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png">';
      var htmlDescription = '<p>' + description + '</p>';
      var htmlCity = '<p>' + city + '</p>';

      $('#temp').html(htmlTemp);
      $('#weather').html(description);
      $('#location').html(htmlCity);
      $('#icon').html(htmlIcon);
    });
  }
  //describe function for button that converts temperature unit
  $('#units').on('click', function() {
    if (units == 'imperial') {
      units = 'metric';
      temp -= 32;
      temp *= 5 / 9;
      temp = Math.round(temp);
      tempUnit = '&#8451';
      htmlTemp = '<p>' + temp + tempUnit + '</p>';
      $('#temp').html(htmlTemp);
    } else {
      units = 'imperial';
      temp *= 9 / 5;
      temp += 32;
      temp = Math.round(temp);
      tempUnit = '&#8457';
      htmlTemp = '<p>' + temp + tempUnit + '</p>';
      $('#temp').html(htmlTemp);
    }
  });
  //use promise chain to ensure the API calls are run in order
  getLocation().then(getWeather);
});
