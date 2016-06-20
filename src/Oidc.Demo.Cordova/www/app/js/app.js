angular.module('app', [
    'ng',
    'ionic',
    'app.controllers',
    'app.services',
    'ng.oidcclient'
])

.run(function ($log, $ionicPlatform, $ionicLoading, $rootScope) {

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $log.log('ionic platform ready');
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            $log.log('keyboard plugin detected');
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            $log.log('statusbar detected');
            // org.apache.cordova.statusbar required
            StatusBar.hide();
        }

    });

})
.config(['ngOidcClientProvider', function (ngOidcClientProvider) {

        ngOidcClientProvider.setSettings({
            authority: "add your STS authority url here",
            client_id: "oidcdemomobile",
            redirect_uri: "https://localhost/oidc",
            post_logout_redirect_uri: "https://localhost/oidc",
            silent_redirect_uri: "https://localhost/oidc",

            response_type: "id_token token",
            scope: "openid profile",

            automaticSilentRenew: true,

            filterProtocolClaims: true,
            loadUserInfo: true,

            popupNavigator: new Oidc.CordovaPopupNavigator(),
            iframeNavigator: new Oidc.CordovaIFrameNavigator()
    });
}])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            cache:false,
            templateUrl: "app/templates/login.html",
            controller: 'LoginCtrl'
        })
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/templates/menu.html",
            controller: 'AppCtrl'
        })
        .state('app.home', {
            url: "/home",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "app/templates/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.account', {
            url: "/account",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "app/templates/account.html",
                    controller: 'AccountCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');

}]);

