angular.module('app.controllers')

.controller('MenuCtrl', ['$log', '$scope', 'ngOidcClient', function ($log, $scope, ngOidcClient) {
    $log.log('MenuCtrl');

    $scope.apptitle = "OIDC Demo";

    $scope.user = {
        data: ngOidcClient.getUserInfo()
    };

    ngOidcClient.userInfoChanged($scope, function () {
        $scope.$apply(function () {
            var userData = ngOidcClient.getUserInfo();
            $scope.user.data = userData;
            $log.log('homeCtrl: user info changed');
            $log.log(JSON.stringify(userData));

        });
    });

}]);