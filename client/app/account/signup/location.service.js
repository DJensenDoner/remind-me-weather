'use strict';

angular.module('remindMeWeatherApp')
  .factory('LocationService', function ($q, $http)
  {
    // Public API here
    var streetsApiKey    = '1108028797595427571';
    var streetsAuthID    = 'd03fbbd5-beb9-4585-884c-4d28b6d32d3d';
    var streetsAuthToken = 'gsL2VvW9sSYh7V9dsLcu';
    return {
      getLocation: function(userZipCode)
      {
        var deferred = $q.defer();
        $http.get('https://api.smartystreets.com/zipcode?auth-id=' + streetsAuthID + '&auth-token=' + streetsAuthToken + '&city=&state=&zipcode=' + userZipCode + '')
          .success(function(data){
            deferred.resolve(data);
          });
        return deferred.promise;
      },
      validateZip: function(userZipCode)
      {
        console.log(userZipCode);
        var deferred = $q.defer();
        $http.get('https://api.smartystreets.com/zipcode?auth-id=' + streetsAuthID + '&auth-token=' + streetsAuthToken + '&city=&state=&zipcode=' + userZipCode + '')
          .then(function(data){
            console.log(data);
            if(data.data[0].status == "invalid_zipcode"){
              deferred.reject();
            } else{
              deferred.resolve(data);
            }
          });
        return deferred.promise;
      }
    };
  });