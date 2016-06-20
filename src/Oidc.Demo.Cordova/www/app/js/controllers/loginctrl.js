angular.module('app.controllers')

.controller('LoginCtrl', ['$log', '$scope', '$state', '$ionicPlatform', 'ngOidcClient', function ($log, $scope, $state, $ionicPlatform, ngOidcClient) {
    $log.log('LoginCtrl loaded');

    $scope.apptitle = "OIDC Demo";
    $scope.loginEnabled = false;

    var signin = function () {
        ngOidcClient.signinPopup().then(function (user) {
            $log.log("user:" + JSON.stringify(user));
            if (!!user) {
                $log.log('Logged in so going to home state');
                $state.go('app.home');
            }
        });
    }

    $ionicPlatform.ready(function () {
        $log.log('HomeCtrl: Platform ready so attempting signin.');
        $scope.loginEnabled = true;
    });

    $scope.logIn = signin;

}]);