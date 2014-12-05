'use strict';

angular.module('remindMeWeatherApp')
  .factory('WeatherService', function ($q, $http, LocationService)
  {
    // Public API here
    var weatherApiKey = 'cbb321e69b3550d9';
    return {
      getWeather: function(year, monthDay, city, state)
      {
        var deferred = $q.defer();
        //format: YYYYMMDD
        $http.jsonp('http://api.wunderground.com/api/'+ weatherApiKey + '/history_' + year + monthDay + '/q/' + state + '/' + city + '.json?callback=JSON_CALLBACK')
          .success(function(data){
            deferred.resolve(data);
          });
        return deferred.promise;
      }
    };
  });