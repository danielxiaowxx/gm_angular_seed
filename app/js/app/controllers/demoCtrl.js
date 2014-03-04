/**
 *
 */

(function() {
    var controller = angular.module('app.controller');

    controller.controller('DemoCtrl', ['$scope', 'demoService', function DemoCtrl($scope, demoService) {

        /*========== Widget Events ==================================================*/

        /*========== Scope Models ==================================================*/

        $scope.name = '';

        /*========== Scope Functions ==================================================*/

        /*========== Listeners ==================================================*/

        /*========== Watches ==================================================*/

        /*========== Private Functions ==================================================*/

        function _init() {
            demoService.sayHello().then(function(result) {
                $scope.name = result.name;
            });
        }

        _init();

    }]);

})();

