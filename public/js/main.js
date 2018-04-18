window.onload = function() {
  console.log("DOM content loaded");

  //grab elements:
  var fullLocation = document.querySelector('.location');
  var cityName = document.querySelector('.city-name');
  var stateName = document.querySelector('.state');
  var zipCode = document.querySelector('.zip-code');
  var weatherType = document.querySelector('.weather');
  var tempString = document.querySelector('.temp-string');
  var relHumidity = document.querySelector('.rel-humidity');
  var windDirection = document.querySelector('.wind-direction');
  var windMPH = document.querySelector('.wind-mph');
  var feelsLike = document.querySelector('.feels-like');
  var forecastUrl = document.querySelector('.forecast');
  var iconUrl = document.querySelector('.icon-url');

  document.querySelector('#submit-button').addEventListener('click', function(event){
    //prevent refresh default
    event.preventDefault();

    //get what user typed in box via endpoint:
    var endPoint = "http://api.wunderground.com/api/30f7dfd1f5eaf9fb/conditions/q/"

    //user's state entry:
    var stateInput = document.getElementById('state-search').value;
    console.log(stateInput);

    //user's city entry:
    var cityInput = document.getElementById('city-search').value;
    console.log(cityInput);

    //combine endPoint & userInput to create final endpoint url
    var combinedUrl = endPoint + stateInput + "/" + cityInput + ".json";
    console.log(combinedUrl);

    $.ajax({
      url : combinedUrl,
      dataType : "jsonp",
      success : function(parsed_json) {
      //get info:
      var location = parsed_json['current_observation']['display_location']['full'];
      var city = parsed_json['current_observation']['display_location']['city'];
      var state = parsed_json['current_observation']['display_location']['state'];
      var zip = parsed_json['current_observation']['display_location']['zip'];
      var weather = parsed_json['current_observation']['weather'];
      var temp = parsed_json['current_observation']['temperature_string'];
      var humid = parsed_json['current_observation']['relative_humidity'];
      var windD = parsed_json['current_observation']['wind_dir'];
      var windM = parsed_json['current_observation']['wind_mph'];
      var feels = parsed_json['current_observation']['feelslike_f'];
      var forecast = parsed_json['current_observation']['forecast_url'];
      var url = parsed_json['current_observation']['icon_url'];

      //append to HTML:
      fullLocation.textContent = location
      cityName.textContent = city;
      stateName.textContent = state;
      zipCode.textContent = zip;
      weatherType.textContent = weather;
      tempString.textContent = temp;
      relHumidity.textContent = humid;
      windDirection.textContent = windD;
      windMPH.textContent = windM;
      feelsLike.textContent = feels;
      forecastUrl.innerHTML = '<a href="' + forecast + '">Click for ' + location + ' ' + 'Forecast</a>';
      iconUrl.innerHTML = '<img src="' + url + '"/>';

    }
    }).fail(function(response) {
      console.log("Something went wrong.");
      console.log("'Fail' response is: " + response);
    }).always(function(response) {
      console.log("This code will always run.");
      console.log("'Always' response is: " + response);
    });// end ajax query

  });//end click event

};//end DOM loaded
