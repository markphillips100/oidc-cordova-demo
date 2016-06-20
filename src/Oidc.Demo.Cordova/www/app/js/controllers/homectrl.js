angular.module('app.controllers')

.controller('HomeCtrl', ['$log', '$scope', function ($log, $scope) {
    $log.log('HomeCtrl loaded');

    $scope.apptitle = "OIDC Demo";

}]);