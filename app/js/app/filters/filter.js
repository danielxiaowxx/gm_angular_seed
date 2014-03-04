/**
 * Author: Daniel
 */

(function() {
    var filter = angular.module( "app.filter", [] );

    /**
     *
     */
    filter.filter('demo', [function template() {
        return function(input) {
            return 'demo:' + input;
        }
    }]);

})();
