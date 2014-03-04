/**
 * Author: Daniel
 */

(function() {
    var filter = angular.module( "app.filter", [] );

    /**
     * 使用underscore的template方法
     */
    filter.filter('template', [function template() {
        return function(inputTmpl, data) {
            return inputTmpl ? (_.template(inputTmpl))(data) : '';
        }
    }]);

})();
