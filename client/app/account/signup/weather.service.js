'use strict';

angular.module('remindMeWeatherApp')
  .factory('WeatherService', function ($q, $http, LocationService)
  {
    // Public API here
    var weatherApiKey = 'cbb321e69b3550d9';
    return {
      getWeather: function(city, state)
      {
        var deferred = $q.defer();
        //http://api.wunderground.com/api/6b5d9a293efd4760/conditions/q/CA/San_Francisco.json
        $http.jsonp('http://api.wunderground.com/api/'+ weatherApiKey + '/conditions/q/' + state + '/' + city + '.json?callback=JSON_CALLBACK')
          .success(function(data){
            deferred.resolve(data);
          });
        return deferred.promise;
      }
    };
  });