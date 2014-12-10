'use strict';

angular.module('remindMeWeatherApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.conditions = [
        { weather: "rain", checked: false },
        { weather: "wind", checked: false },
        { weather: "cats", checked: false }
    ]
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
          alerts: $scope.conditions
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

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
