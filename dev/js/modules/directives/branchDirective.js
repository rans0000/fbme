/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('app.core')
        .directive('branch', branchDirective);

    branchDirective.$inject = ['$compile'];
    function branchDirective ($compile) {
        var directiveObject = {
            replace: true,
            restrict: 'E',
            scope: {
                item: '='
            },
            templateUrl: 'js/modules/directives/branchDirectiveTemplate.html',
            link: branchLink,
            controller: BranchController,
            controllerAs: 'branch',
            bindToController: true
        };

        BranchController.$inject = ['$rootScope'];
        
        return directiveObject;

        function branchLink (scope, element, attributes, ctrl) {
            if(angular.isArray(scope.branch.item.children)){
                $compile('<tree collection="branch.item.children"></tree>')(scope, function (cloned, scope) {
                    element.append(cloned);
                });
            }
        }

        function BranchController ($rootScope) {
            var vm = this;
            vm.onItemClick = onItemClick;
            
            function onItemClick (item) {
                $rootScope.$broadcast('folderSelect', item);
            }
        }
    }
})();