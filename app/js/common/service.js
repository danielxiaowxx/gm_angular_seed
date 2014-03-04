/**
 * User: Daniel
 * Date: 13-5-2
 * Time: 下午10:24
 */

(function() {

    var serviceModule = angular.module('gm.service', []);

    /**
     * service用到的常量
     */
    // 国际化常量
    var I18NConst = {
        zh_cn: 0
        , us_en: 1
    }
    serviceModule.constant('I18NConst', I18NConst);

    /**
     * 拦截http response，统一进行错误处理
     */
    serviceModule.factory('errorHttpInterceptor', ['$q','errorService', function errorHttpInterceptor($q, errorService) {
        return function(promise) {
            return promise.then(
                function(response) {
                    if (200 <= response.status && response.status < 300) {
                        if (response.data.error) {  // app response error
                            errorService.setError(response.data.errorMsg);
                            return $q.reject(response);
                        }
                    } else {  // app response error
                        errorService.setError(response.status);
                        return $q.reject(response);
                    }
                    return response;
                }
                , function(response) { // server error
                    errorService.setError('response status ' + response.status);
                    return $q.reject(response);
                }
            );
        }
    }]);

    /**
     *  请求结束处理，配合requestStartInterceptor，处理比如全局loading提示
     */
    serviceModule.factory('requestCompleteInterceptor', ['loadingService', function requestCompleteInterceptor(loadingService) {
        return function(promise) {
            var decrementRequestCount = function(response) {
                loadingService.requestCount--;
                return response;
            };

            return promise.then(decrementRequestCount , decrementRequestCount);
        }
    }]);

    /**
     * 请求开始前的处理
     */
    serviceModule.factory('requestStartInterceptor', ['loadingService', function requestStartInterceptor(loadingService) {
        return function(data, headersGetter) {
            if (data) data = $.param($.parseJSON(data)); // 将参数处理成Form Post数据格式，配合content-type:application/x-www-form-urlencoded

            loadingService.requestCount++;
            return data;
        };
    }]);

    /**
     * 用于全局界面处理错误信息的服务
     */
    serviceModule.factory('errorService', [function errorService() {
        var serviceInstance = {
            errorMessage: null
            , setError: function(msg) {
                this.errorMessage = msg;
            }
            , clear: function() {
                this.errorMessage = null;
            }
        }
        return serviceInstance;
    }]);

    /**
     * 用于处理全局loading提示显示
     */
    serviceModule.factory('loadingService', [function loadingService() {
        var serviceInstance = {
            requestCount: 0,
            isLoading: function() {
                return this.requestCount > 0;
            }
        };
        return serviceInstance;
    }]);


    /**
     * 工具类服务
     */
    serviceModule.factory('utilService', ['$http', '$q', function utilService($http, $q) {
        var serviceInstance = {
            /**
             * 安全执行方法，会判断是否在生命周期内
             * @param $scope
             * @param fn
             */
            safeApply: function($scope, fn) {
                var phase = $scope.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    $scope.$apply(fn);
                }
            }

            /**
             * 对service层的访问远程url的重复代码再封装。
             * 这里handleResponseFn的参数是成功返回期望数据的响应数据，错误数据已交给errorHttpInterceptor拦截器处理
             */
            , httpPost: function(url, param, handleResponseFn) {
                var deferred = $q.defer();
                $http.post(url, param || {}).success(function(response) {
                    (handleResponseFn || angular.noop)(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            }

            /**
             * 对service层的访问远程url的重复代码再封装。
             * 这里handleResponseFn的参数是成功返回期望数据的响应数据，错误数据已交给errorHttpInterceptor拦截器处理
             */
            , httpGet: function(url, param, handleResponseFn) {
                var deferred = $q.defer();
                $http.get(url, {params:param}).success(function(response) {
                    (handleResponseFn || angular.noop)(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            }
        };
        return serviceInstance;
    }]);

    serviceModule.factory('i18nService', ['$q', '$http', 'I18NConst', 'APPConst', function i18nService($q, $http, I18NConst, APPConst) {
        var serviceInstance = {
            getData: function(lang) {
                var deferred = $q.defer()
                    , i18nFile
                    ;
                switch (lang) {
                    case I18NConst.zh_cn:
                        i18nFile =  'zh_cn.json';
                        break;
                    case I18NConst.us_en:
                        i18nFile =  'us_en.json';
                        break;
                    default :
                        break;
                };

                $http.get('/' + APPConst.Config.frontend_context + '/assets/i18n/' + i18nFile).success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            }
        };
        return serviceInstance;
    }]);

})();

