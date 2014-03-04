/**
 * User: Daniel
 */

(function() {
    var directives = angular.module('gm.directive', ['gm.service']);

    /**
     * 用法请参考http://mgcrea.github.io/angular-strap/#/popover
     * 在元素上增加data-placement="bottom|top|left|right"来决定弹出方向
     */
    directives.directive('bsPopover', ['$parse', '$compile', '$http', '$timeout', '$q', '$templateCache', function bsPopover($parse, $compile, $http, $timeout, $q, $templateCache) {
            $('body').on('keyup', function (ev) {
                if (ev.keyCode === 27) {
                    $('.popover.in').each(function () {
                        $(this).popover('hide');
                    });
                }
            });
            return {
                restrict: 'A',
                scope: true,
                link: function postLink(scope, element, attr, ctrl) {
                    var getter = $parse(attr.bsPopover), setter = getter.assign, value = getter(scope), options = {};
                    if (angular.isObject(value)) {
                        options = value;
                    }
                    $q.when(options.content || $templateCache.get(value) || $http.get(value, { cache: true })).then(function onSuccess(template) {
                        if (angular.isObject(template)) {
                            template = template.data;
                        }
                        if (!!attr.unique) {
                            element.on('show', function (ev) {
                                $('.popover.in').each(function () {
                                    var $this = $(this), popover = $this.data('popover');
                                    if (popover && !popover.$element.is(element)) {
                                        $this.popover('hide');
                                    }
                                });
                            });
                        }
                        if (!!attr.hide) {
                            scope.$watch(attr.hide, function (newValue, oldValue) {
                                if (!!newValue) {
                                    popover.hide();
                                } else if (newValue !== oldValue) {
                                    popover.show();
                                }
                            });
                        }
                        if (!!attr.show) {
                            scope.$watch(attr.show, function (newValue, oldValue) {
                                if (!!newValue) {
                                    $timeout(function () {
                                        popover.show();
                                    });
                                } else if (newValue !== oldValue) {
                                    popover.hide();
                                }
                            });
                        }
                        element.popover(angular.extend({}, options, {
                            content: template,
                            html: true
                        }));
                        var popover = element.data('bs.popover');
                        popover.hasContent = function () {
                            return this.getTitle() || template;
                        };
                        popover.getPosition = function () {
                            var r = $.fn.popover.Constructor.prototype.getPosition.apply(this, arguments);
                            $compile(this.$tip)(scope);
                            scope.$digest();
                            this.$tip.data('popover', this);
                            return r;
                        };
                        scope.$popover = function (name) {
                            popover(name);
                        };
                        angular.forEach([
                            'show',
                            'hide'
                        ], function (name) {
                            scope[name] = function () {
                                popover[name]();
                            };
                        });
                        scope.dismiss = scope.hide;
                        angular.forEach([
                            'show',
                            'shown',
                            'hide',
                            'hidden'
                        ], function (name) {
                            element.on(name, function (ev) {
                                scope.$emit('popover-' + name, ev);
                            });
                        });
                    });
                }
            };
        }
    ]);

    /**
     * 使用说明：<div gm-alert-bar alert-message="">
     * 需要结合errorService，如<div gm-alert-bar alert-message="errorService.errorMessage">
     */
    directives.directive('gmAlertBar', ['$parse', function gmAlertBar($parse) {
        var directiveDefinitionObject = {
            restrict: 'A'
            , template: [
                '<div class="alert alert-error" ng-show="errorMessage">'
                , '    <button type="button" class="close" ng-click="hideAlert()">×</button>'
                , '    <strong>Error!</strong> {{errorMessage}}'
                , '</div>'
            ].join('')
            , replace: true
            , link: function(scope, element, attrs) {
                var alertMassageAttr = attrs.alertMessage;
                scope.errorMessage = null;

                scope.$watch(alertMassageAttr, function(newVal, oldVal) {
                    scope.errorMessage = newVal;
                });

                scope.hideAlert = function() {
                    scope.errorMessage = null;
                    // Also clear the error message on the bound variable.
                    // Do this so that if the same error happens again
                    // the alert bar will be shown again next time.
                    $parse(alertMassageAttr).assign(scope, null);
                }
            }
        };
        return directiveDefinitionObject;
    }]);

    /**
     *  Events
     */
    ['gmBlur', 'gmFocus'].forEach(function(directiveName) {
        directives.directive(directiveName, ['$parse', function($parse) {
            return function(scope, element, attr) {
                var fn = $parse(attr[directiveName])
                    , eventName = directiveName.replace('gm', '').toLowerCase()
                    ;
                element.bind(eventName, function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            };
        }]);
    });

})();



