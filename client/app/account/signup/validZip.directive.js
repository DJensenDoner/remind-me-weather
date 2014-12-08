angular.module('remindMeWeatherApp').directive('validZipDirective', function(LocationService, $q){
	// Runs during compile
	var city   = '',
	      state = '',
	      zip    = '';

	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			ngModel: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $http) {},
		require:  'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		//template: '<p>this is the api call results: {{ngCity}}</p>',
		// templateUrl: ' ',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, ngModel) {
			ngModel.$asyncValidators.checkValid = function(modelValue, viewValue) {
				var deferred = $q.defer();
				if(viewValue > 9999 && viewValue < 100000){
					LocationService.validateZip(viewValue).then(function(data)
					{	
						deferred.resolve(true);
						city = data.data[0].city_states[0].city ;
						state = data.data[0].city_states[0].state_abbreviation;
						zip = data.data[0].zipcodes[0].zipcode;
						$scope.$parent.user.city = city;
						$scope.$parent.user.state = state;
						$scope.$parent.user.zip = zip;
					},function(data){
						deferred.reject();
					});
				}else
				{	
					deferred.reject();
				}
				return deferred.promise;
			};
		}
	};
});