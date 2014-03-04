/**
 * User: Daniel
 * Date: 13-5-2
 * Time: 下午11:39
 */

(function() {
    var serviceModule = angular.module('app.service');

    serviceModule.factory('demoService', ['utilService', 'APPConst', function demoService(utilService, APPConst) {
        var serviceInstance = {
            sayHello: function() {
                return utilService.httpPost('/' + APPConst.Config.backend_context + '/demo/sayHello', {name:'daniel'});
            }
        };
        return serviceInstance;
    }]);

})();


