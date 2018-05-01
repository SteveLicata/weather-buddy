window.onload = function() {
  console.log("DOM content loaded");

  //grab elements from weather.erb:
  var text1 = document.querySelector('#text1');
  var text2 = document.querySelector('#text2');
  var fullLocation = document.querySelector('.location');
  var countryName;
  var zipCode = document.querySelector('.zip-code');
  var weatherType = document.querySelector('.weather');
  var iconUrl = document.querySelector('.icon-url');
  var tempString = document.querySelector('.temp-string');
  var feelsLike = document.querySelector('.feels-like');
  var relHumidity = document.querySelector('.rel-humidity');
  var windString = document.querySelector('.wind-string');
  var windDirection = document.querySelector('.wind-direction');
  var windMPH = document.querySelector('.wind-mph');
  var visibilityMi = document.querySelector('.visibility-mi');
  var heatIndexString = document.querySelector('.heat-index');
  var dewpointString = document.querySelector('.dewpoint-string');
  var forecastUrl = document.querySelector('.forecast');

  // clIck event for submit button
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

    // api call
    $.ajax({
      url : combinedUrl,
      dataType : "jsonp",
      success : function(parsed_json) {
      //get info:
      var location = parsed_json['current_observation']['display_location']['full'];
      var country = parsed_json['current_observation']['display_location']['country'];
      var zip = parsed_json['current_observation']['display_location']['zip'];
      var weather = parsed_json['current_observation']['weather'];
      var temp = parsed_json['current_observation']['temperature_string'];
      var humid = parsed_json['current_observation']['relative_humidity'];
      var windS = parsed_json['current_observation']['wind_string'];
      var windD = parsed_json['current_observation']['wind_dir'];
      var windM = parsed_json['current_observation']['wind_mph'];
      var feels = parsed_json['current_observation']['feelslike_f'];
      var visibility = parsed_json['current_observation']['visibility_mi'];
      var heatIndex = parsed_json['current_observation']['heat_index_string'];
      var dewpoint = parsed_json['current_observation']['dewpoint_string'];
      var forecast = parsed_json['current_observation']['forecast_url'];
      var url = parsed_json['current_observation']['icon_url'];

      //append api information to HTML in weather.erb:
      fullLocation.textContent = location + ', ' + country;
      zipCode.textContent = zip;
      weatherType.innerHTML = '<h2>Right Now:</h2>' + '<br>' + weather;
      iconUrl.innerHTML = '<img src="' + url + '"/>';
      tempString.textContent = temp;
      feelsLike.innerHTML = 'Feels Like: ' + feels;
      relHumidity.textContent = 'Humidity: ' + humid;
      windString.textContent = 'Wind: ' + windS;
      windDirection.textContent = 'Wind Direction: ' + windD;
      windMPH.textContent = 'Wind Speed: ' + windM + ' MPH';
      visibilityMi.textContent = 'Visibility: ' + visibility + ' Miles';
      heatIndexString.textContent = 'Heat Index: ' + heatIndex;
      dewpointString.textContent = 'Dewpoint: ' + dewpoint;
      forecastUrl.innerHTML = '<a href="' + forecast + '">Forecast for ' + location + '</a>';

    }
    }).fail(function(response) {
      console.log("Something went wrong.");
      console.log("'Fail' response is: " + response);
    }).always(function(response) {
      console.log("This code will always run.");
      console.log("'Always' response is: " + response);
    });// end ajax query

  });//end click event


  // Code to append text one letter at a time:
  // https://stackoverflow.com/questions/7264974/show-text-letter-by-letter
  var showText = function (target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () {
      showText(target, message, index, interval);
      }, interval);
    }
  }

  // call function to append first batch of text
  $(function () {
    showText("#text1", "Get the current weather", 0, 500);
  });

  // call function to append second batch of text
  $(function () {
    showText("#text2", "Search by city and state", 0, 500);
  });

  
};//end DOM loaded
