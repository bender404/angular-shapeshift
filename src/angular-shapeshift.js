/**
 * angular-shapeshift - This directive allows you to jQuery.Shapeshift.
 * @version v0.1.0 - 2015-07-29
 * @link http://angular-ui.github.com
 * @license MIT
 */

(function (window, angular, undefined) {
	'use strict';

	angular.module('shapeshift', [])
		.value('shapeShiftConfig', {})
		.directive('ngShape', ['shapeShiftConfig', '$log', function (shapeShiftConfig, $log) {
			return {
				restrict: 'EA',
				require: '?ngModel',
				replace: true,
				scope: {
					shapes: '=?',
					options: '=?',
					ngModel: '=?'
				},
				link: function (scope, element, attrs, ngModelCtrl) {
					var reOrder, limit = 3, i = 0, shapesOptions = {
						gutterX: 20,
						gutterY: 20,
						paddingX: 5,
						paddingY: 5,
						colWidth: 0,
						animateOnInit: true
					};

					if (!angular.element.fn || !angular.element.fn.jquery) {
						$log.error('angular-shapeshift: jQuery should be included before AngularJS!');
						return;
					}

					if (!angular.element.fn || !angular.element.fn.shapeshift) {
						$log.error('angular-shapeshift: jQuery.ShapeShit is not loaded');
						return;
					}

					reOrder = function (elementCollection) {
						var model = [];

						elementCollection.each(function (i, obj) {
							var index = elementCollection[i].attributes.context.value;
							model.push({ order: i, context: index });
						});

						if (ngModelCtrl && model.length > 0) {
							ngModelCtrl.$setViewValue(model);
						}

						return scope.ngModel;
					};

					if (scope.options) {
						for (var optItem in scope.options) {
							shapesOptions[optItem] = scope.options[optItem];
						}
					}

					if (scope.ngModel && scope.ngModel.length > 0) {
						limit = scope.ngModel.length;
					} else if (scope.shapes) {
						limit = scope.shapes;
					}

					if (scope.ngModel && scope.ngModel.length > 0) {
						for (; i < limit;) {
							if (!scope.ngModel[i].order) {
								scope.ngModel[i].order = i;
							}

							if (!scope.ngModel[i].context) {
								scope.ngModel[i].context = scope.ngModel[i].order;
							}

							if (!scope.ngModel[i].wrap) {
								scope.ngModel[i].wrap = '<span>&nbsp;</span>';
							}

							var pushedElement = '<div class="ng-shape ng-shape-' + i + '" context="' + scope.ngModel[i].context + '">' + scope.ngModel[i].wrap + '</div>';
							angular.element(pushedElement).appendTo(element[0]);
							i++;
						}
					} else {
						for (; i < limit;) {
							var pushedElement = '<div class="ng-shape ng-shape-' + i + '" context="' + i + '"><span>&nbsp;</span></div>';
							angular.element(pushedElement).appendTo(element[0]);
							i++;
						}
					}

					reOrder(element.children());
					element.shapeshift(shapesOptions);

					element.on('ss-rearranged', function (e, selected) {
						reOrder(element.children());
					});

					element.on('ss-added', function (e, selected) {
						reOrder(element.children());
					});

					element.on('ss-removed', function (e, selected) {
						reOrder(element.children());
					});

				}
			};
		}]);

})(window, window.angular);