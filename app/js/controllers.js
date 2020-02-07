'use strict';

/* Controllers */

angular.module('openWeatherApp.controllers', [])

  // Controller for "open weather map" api data search
  .controller('OpenWeatherCtrl',
    ['$scope','openWeatherMap','exampleLocations','stormLocations','ISO3166',
      function($scope,openWeatherMap,exampleLocations,stormLocations,ISO3166) {

    $scope.message = '';
    $scope.hasState = '';

    // Expose example locations to $scope
    $scope.exampleLocations = exampleLocations;
    $scope.stormLocations = stormLocations;
    $scope.iconBaseUrl = 'http://openweathermap.org/img/w/';

    // On initialization load data for first example entry
    $scope.forecast = openWeatherMap.queryForecastDaily({
      location: exampleLocations[ 0 ]
    });

    // Get forecast data for location as given in $scope.location
    $scope.getForecastByLocation = function() {

      if ($scope.location == '' || $scope.location == undefined) {
        $scope.hasState = 'has-warning';
        $scope.message = 'Please provide a location';
        return;
      }

      $scope.hasState = 'has-success';


        console.log("ManuallyMarked Page: "+$scope.location);
        ADRUM.markVirtualPageBegin("ManuallyMarked: "+$scope.location);


      $scope.forecast = openWeatherMap.queryForecastDaily({
        location: $scope.location
      });

        console.log("Mark the end of the virtual page: "+$scope.location);
        ADRUM.markVirtualPageEnd();
    };

    // Set $scope.location and execute search on API
    $scope.setLocation = function(loc) {
      $scope.location = loc;
      $scope.getForecastByLocation();
    };

    // Get icon image url
    $scope.getIconImageUrl = function(iconName) {
      return (iconName ? $scope.iconBaseUrl + iconName + '.png' : '');
    };

  }])
