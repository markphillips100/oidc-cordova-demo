angular.module('app.controllers')
    .controller('AccountCtrl', ['$log', '$scope', '$state', 'ngOidcClient', function ($log, $scope, $state, ngOidcClient) {
        $log.log('AccountCtrl');

        $scope.userInfo = {
            userData: {},
            claims: []
        };

        function processUserData() {
            var userInfo = ngOidcClient.getUserInfo();
            $scope.userInfo.userData = userInfo;
            if (userInfo && userInfo.user) {
                $scope.userInfo.claims = [];
                for (var property in userInfo.user.profile) {
                    if (userInfo.user.profile.hasOwnProperty(property)) {
                        $scope.userInfo.claims.push({
                            key: property,
                            value: userInfo.user.profile[property]
                        });
                    }
                }
            }
        };

        processUserData();

        ngOidcClient.userInfoChanged($scope, function () {
            $scope.$apply(function () {
                processUserData();
            });
        });

        $scope.logOut = function () {
            ngOidcClient.signoutPopup().then(function () {
                $state.go('login');
            });
        };
    }]);