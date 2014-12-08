'use strict';

angular.module('remindMeWeatherApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, $q, $http) {
    $scope.user = {};
    $scope.errors = {};
    $scope.weather = {
        rain: false,
        wind: false,
        tornado: false,
        cats: false
    };
    var weatherApiKey = 'cbb321e69b3550d9';

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          zip: $scope.user.zip,
          city: $scope.user.city,
          state: $scope.user.state,
          email: $scope.user.email,
          password: $scope.user.password,
          alerts: $scope.weather
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.weatherCall = function(city, state){
        console.log('test works!');
        var deferred = $q.defer();
        //http://api.wunderground.com/api/6b5d9a293efd4760/conditions/q/CA/San_Francisco.json
                 $http.jsonp('http://api.wunderground.com/api/'+ weatherApiKey + '/conditions/q/' + state + '/' + city + '.json?callback=JSON_CALLBACK')
          .success(function(data){
            deferred.resolve(data);
            console.log(data);
          });
          return deferred.promise 
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
