module.exports = [
    function () {
        return {
            restrict: 'E',
            scope: {
                key: '@',
                list: '=',
                change: '&'
            },
            replace: true,
            require: '?ngModel',
            templateUrl: './templates/common/uibDropdownReset/tpl.html',
            link: function (scope, elem, attr, ctrls) {
                var noBasic = angular.isDefined(attr.noBasic),
                    isChange = angular.isDefined(attr.change),
                    isReset = angular.isDefined(attr.reset);
                var vm = scope.vm = {};
                vm.check = function (item) {
                    if (item != vm.ngModel) {
                        vm.ngModel = item;
                    }
                };
                scope.$watch('vm.ngModel', function (newModel) {
                    if (ctrls && (ctrls.$viewValue != newModel)) {
                        ctrls.$setViewValue(newModel);
                    }
                    if (isChange) {
                        scope.change({ item: newModel })
                    }
                });
                scope.$watch('list', function (newList) {
                    vm.list = (noBasic ? newList : _.concat([{ name: '--请选择--' }], newList)) || [];
                    if (!vm.ngModel || !_.find(vm.list, vm.ngModel)) {
                        vm.ngModel = vm.list[0];
                    }
                });
                if (ctrls) {
                    ctrls.$render = function () {
                        vm.ngModel = ctrls.$viewValue;
                    };
                }
                if (isReset) {
                    scope.$on('dropdownReset', function () {
                        vm.ngModel = vm.list[0];
                    });
                }
            }
        }
    }
]