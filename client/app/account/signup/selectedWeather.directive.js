angular.module('remindMeWeatherApp').directive('selectedWeatherDirective', function(LocationService, WeatherService, $q){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: {
		 	ngModel: '='
		 }, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require:  'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, ngModel) {
			console.log($scope.$parent.weather);
			// if($scope.$parent.weather.rain == false){
			// 	console.log("its raining!")
			// }
		}
	};
});