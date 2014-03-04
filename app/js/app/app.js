/**
 * User: Daniel
 * Date: 13-4-28
 * Time: 上午11:52
 */

(function() {

    // fake backend app：当用假数据时用以下声明
//    var app = angular.module('app', ['gm.directive', 'app.controller', 'ui.bootstrap', 'ngRoute', 'ngAnimate', 'app.mock']);
    // real backend app：当用真数据时用以下声明
    var app = angular.module('app', ['gm.directive', 'app.controller', 'ui.bootstrap', 'ngRoute', 'ngAnimate']);

    /**
     * 定义全局常量
     */
    var APPConst = {
        Config: {
            frontend_context: 'angular_seed', // 前端web context
            backend_context: 'angular_seed_backend' // 后端服务context
        },
        Event: {
            changeLanguage: 'chnage language'
        }
    };
    app.constant('APPConst', APPConst);

    /**
     * 程序配置
     */
    app.config(['$httpProvider', '$locationProvider', '$routeProvider', function config($httpProvider, $locationProvider, $routeProvider) {
        $httpProvider.responseInterceptors.push('requestCompleteInterceptor');
        $httpProvider.responseInterceptors.push('errorHttpInterceptor');

        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/demo', {
                templateUrl: 'assets/tmpl/demo-tmpl.html',
                controller: 'DemoCtrl'
            }).
            otherwise({templateUrl: 'assets/tmpl/demo-tmpl.html'});

    }]);


    /**
     *
     */
    app.run(['$rootScope', '$http', '$route', 'requestStartInterceptor', 'i18nService', 'APPConst', 'I18NConst', function run($rootScope, $http, $route, requestStartInterceptor, i18nService, APPConst, I18NConst) {
        $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';
        $http.defaults.transformRequest.push(requestStartInterceptor);

        // 这里可以定义全局共用绑定的model
        $rootScope.Model = {
        };

        // 国际化
        $rootScope.I18N = {};
        $rootScope.getI18NData = function(lang) {
            i18nService.getData(lang).then(function(response) {
                $rootScope.I18N = response;
                $rootScope.$broadcast(APPConst.Event.changeLanguage);
            });
        };
        $rootScope.getI18NData(I18NConst.zh_cn);

    }]);

})();


