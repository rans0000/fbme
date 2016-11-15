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

        BranchController.$inject = ['$scope'];

        return directiveObject;

        function branchLink (scope, element) {
            if(angular.isArray(scope.branch.item.children)){
                $compile('<tree collection="branch.item.children"></tree>')(scope, function (cloned) {
                    element.append(cloned);
                });
            }
        }

        function BranchController ($scope) {
            var vm = this;
            vm.isActive = false;
            vm.isOpen = false;
            vm.onItemClick = onItemClick;
            vm.toggleOpenState = toggleOpenState;
            $scope.$on('folderSelectFromExplorer', onFolderSelect);
            $scope.$on('folderOpened', folderOpenedLitener);

            function onItemClick (item) {
                $scope.$emit('folderSelectFromTree', item);
            }

            function onFolderSelect (event, item) {
                if(item === vm.item){
                    vm.isActive = true;
                    vm.isOpen = true;
                    $scope.$emit('folderOpened');
                }
                else{
                    vm.isActive = false;
                }
            }

            function toggleOpenState () {
                vm.isOpen = !vm.isOpen;
                if(vm.isOpen){
                }
                else{
                    $scope.$emit('folderOpened');
                }
            }
            
            function folderOpenedLitener () {
                //console.log(vm.item.title);
            }
        }
    }
})();