/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('app.core')
        .directive('branch', branchDirective);

    branchDirective.$inject = ['$compile', 'jQuery'];
    function branchDirective ($compile, $) {
        var directiveObject = {
            replace: true,
            restrict: 'E',
            scope: {
                item: '=',
                selectedFolder: '='
            },
            templateUrl: 'js/modules/directives/branchDirectiveTemplate.html',
            link: branchLink,
            controller: BranchController,
            controllerAs: 'branch',
            bindToController: true
        };

        BranchController.$inject = ['$scope'];

        return directiveObject;

        function branchLink (scope, element, attributes, ctrl) {
            var $element = $(element);
            
            ctrl.toggleOpenState = toggleOpenState;
            
            if(angular.isArray(scope.branch.item.children)){
                $compile('<tree collection="branch.item.children" selected-folder="tree.selectedFolder"></tree>')(scope, function (cloned) {
                    element.append(cloned);
                });
            }
            
            function toggleOpenState (event) {
                event.stopPropagation();
                ctrl.isOpen = !ctrl.isOpen;
                if(ctrl.isOpen){
                    $element.children('.menu-tree').slideDown();
                }
                else{
                    scope.$emit('folderOpened');
                    $element.children('.menu-tree').slideUp();
                }
            }
        }

        function BranchController ($scope) {
            var vm = this;
            //vm.isActive = false;
            vm.isActive = vm.item === vm.selectedFolder;
            vm.isOpen = false;
            vm.onItemClick = onItemClick;
            vm.hasInnerFolder = checkForInnerFolder();
            //vm.toggleOpenState = toggleOpenState;
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
            
            function folderOpenedLitener () {
                //console.log(vm.item.title);
            }
            
            function checkForInnerFolder () {
                var hasFolder = false;
                angular.forEach(vm.item.children, function (item) {
                    if(item.type === 'Folder'){
                        hasFolder = true;
                    }
                });
                return hasFolder;
            }
        }
    }
})();