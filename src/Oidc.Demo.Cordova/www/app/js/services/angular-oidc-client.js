var NgOidcClient;
(function (NgOidcClient) {
    angular.module('ng.oidcclient', []);
    NgOidcClient.getModule = function () {
        return angular.module("ng.oidcclient");
    };
})(NgOidcClient || (NgOidcClient = {}));

(function (NgOidcClient) {
    "use strict";
    var app = NgOidcClient.getModule();
    var NgOidcClientProvider = (function () {
        function NgOidcClientProvider() {
            this.settings = null;
            this.mgr = null;
            this.userInfo = {
                user: null,
                isAuthenticated: false
            };
            this.urls = [];
            this.$get.$inject = ['$q', '$log', '$rootScope'];
        }
        NgOidcClientProvider.prototype.setSettings = function (options) {
            this.settings = options;
        };
        NgOidcClientProvider.prototype.setUrls = function (options) {
            this.urls = options;
        };
        NgOidcClientProvider.prototype.$get = function ($q, $log, $rootScope) {
            var _this = this;
            $log.log("NgOidcClient service started");
            if (!this.settings)
                throw Error('NgOidcUserService: Must call setSettings() with the required options.');
            Oidc.Log.logger = console;
            Oidc.Log.logLevel = Oidc.Log.INFO;
            this.mgr = new Oidc.UserManager(this.settings);
            this.mgr.events.addUserLoaded(function (u) {
                _this.userInfo.user = u;
                _this.userInfo.isAuthenticated = true;
                $log.log("user loaded");
                notifyUserInfoChangedEvent();
            });
            this.mgr.events.addUserUnloaded(function () {
                _this.userInfo.user = null;
                _this.userInfo.isAuthenticated = false;
                $log.log("user unloaded");
                notifyUserInfoChangedEvent();
            });
            this.mgr.events.addAccessTokenExpiring(function () {
                $log.log("token expiring");
            });
            this.mgr.events.addAccessTokenExpired(function () {
                _this.userInfo.user = null;
                _this.userInfo.isAuthenticated = false;
                $log.log("token expired");
                notifyUserInfoChangedEvent();
            });
            this.mgr.events.addSilentRenewError(function (e) {
                _this.userInfo.user = null;
                _this.userInfo.isAuthenticated = false;
                $log.log("silent renew error", e.message);
                notifyUserInfoChangedEvent();
            });
            var signinPopup = function (args) {
                return _this.mgr.signinPopup(args)
                    .then(function (user) {
                    $log.log("signed in", user);
                    return user;
                })
                    .catch(function (err) {
                    $log.log(err);
                });
            };
            var signoutPopup = function (args) {
                return _this.mgr.signoutPopup(args);
            };
            var getUrls = function () {
                return _this.urls;
            };
            var getUserInfo = function () {
                return _this.userInfo;
            };
            var notifyUserInfoChangedEvent = function () {
                $rootScope.$emit('ng-oidcclient-userinfo-changed-event');
            };
            var userInfoChanged = function (scope, callback) {
                var handler = $rootScope.$on('ng-oidcclient-userinfo-changed-event', callback);
                scope.$on('$destroy', handler);
            };
            return {
                getUserInfo: getUserInfo,
                getUrls: getUrls,
                signinPopup: signinPopup,
                signoutPopup: signoutPopup,
                userInfoChanged: userInfoChanged
            };
        };
        return NgOidcClientProvider;
    }());
    app.provider('ngOidcClient', NgOidcClientProvider);
})(NgOidcClient || (NgOidcClient = {}));
