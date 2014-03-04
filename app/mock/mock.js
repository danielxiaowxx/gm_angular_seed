/**
 * User: Daniel
 * Date: 13-5-29
 * Time: 下午6:30
 */

(function() {

    var mockModule = angular.module('app.mock', []);

    mockModule.config(['$provide', function config($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }]);

    mockModule.run(['$httpBackend', 'APPConst', function run($httpBackend, APPConst) {
        $httpBackend.whenPOST('/' + APPConst.Config.backend_context +  '/demo/sayHello').respond(Mock.Demo.sayHello);
        // ... 在此处根据需要添加自己的拦截规则去使用mock数据

        $httpBackend.whenPOST(/.*/).passThrough();
        $httpBackend.whenGET().passThrough();
    }]);

})();

/**
 * Mock 数据
 */
var Mock = {
    Demo: {
        sayHello: "hello daniel"
    }
    // ... 将mock json数据定义在此
};

