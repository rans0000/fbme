/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('collaboration.module')
        .controller('CollaborationDetailsController', CollaborationDetailsController);

    CollaborationDetailsController.$inject = ['collaborationService', '$scope', '$filter'];
    function CollaborationDetailsController (collaborationService, $scope, $filter) {
        var vm = this;
        vm.itemTree = [];
        vm.selectedFolder = {};
        vm.selectedFolderFilter = '';
        vm.selectedItem = null;
        vm.selectedItemCopy = null;
        vm.selectedItemList = [];
        vm.isMenuCollapsed = false;
        vm.pagination = getPaginationValues();
        vm.menuOptions = getmenuOptions();
        $scope.core.currentPage = 'page-inner';

        vm.toggleFavouriteStatus = toggleFavouriteStatus;
        vm.toggleFavouriteText = toggleFavouriteText;
        vm.onItemSelected = onItemSelected;
        vm.selectAllItems = selectAllItems;
        vm.toggleItemHighlighted = toggleItemHighlighted;
        vm.shareItem = shareItem;
        vm.onEditselectedItemSubmit = onEditselectedItemSubmit;
        vm.populateSelectedFolder = populateSelectedFolder;
        vm.onDeleteItems = onDeleteItems;
        vm.toggleMenuCollapse = toggleMenuCollapse;
        vm.pageChanged = pageChanged;
        $scope.$on('folderSelectFromTree', onFolderSelect);


        init();

        //--------------------------------------
        //function declarations

        function init () {
            collaborationService.getCollaborationDetails()
                .then(getCollaborationDetailsSuccess)
                .catch(getCollaborationDetailsError);
        }

        function getCollaborationDetailsSuccess (response) {
            vm.itemTree = response;
            if(response.length && response[0].hasOwnProperty('children') && response[0].children.length ){
                populateSelectedFolder(response[0]);
            }
        }

        function getCollaborationDetailsError (error) {
            //a crude error handling
            var errMessage = 'Error: ' + error.status + ' ' + error.statusText;
            alert(errMessage);
        }

        function toggleFavouriteStatus (item) {
            item.favourite = !item.favourite;
        }

        function toggleFavouriteText (item) {
            var favText = item.favourite? 'Favourite' : 'Unfavourite';
            return favText;
        }

        function shareItem () {
            alert('share functionality not implimented');
        }

        function onItemSelected () {
            vm.selectedItemList = $filter('filter')(vm.selectedFolder.children, {checked: true});
        }

        function selectAllItems () {
            var currentItems = vm.selectedFolder.children.slice(((vm.pagination.currentPage-1)*vm.pagination.itemsPerPage), ((vm.pagination.currentPage)*vm.pagination.itemsPerPage));
            currentItems = $filter('filter')(currentItems, vm.selectedFolderFilter);
            vm.selectedItemList = [];
            angular.forEach(currentItems, function (item) {
                item.checked = true;
                vm.selectedItemList.push(item);
            });
        }

        function toggleItemHighlighted (item) {
            if(item === vm.selectedItem){
                vm.selectedItem = null;
                vm.selectedItemCopy = null;
            }
            else{
                vm.selectedItem = item;
                vm.selectedItemCopy = angular.copy(item);
            }
        }

        function onEditselectedItemSubmit () {
            var isSaveSuccess = collaborationService.editFileFolderItem(vm.selectedItem, vm.selectedItemCopy);
            if(isSaveSuccess){
                alert('data saved');
            }
            else{
                alert('invalid data');
            }
        }

        function onFolderSelect (event, item) {
            populateSelectedFolder(item);
        }

        function populateSelectedFolder (item) {
            vm.selectedFolder = item;
            vm.selectedItem = null;
            vm.selectedItemCopy = null;
            vm.selectedItemList = [];
            angular.forEach(vm.selectedFolder.children, function (value) {
                value.checked = false;
            });
            $scope.$broadcast('folderSelectFromExplorer', item);
        }

        function onDeleteItems () {
            angular.forEach(vm.selectedItemList, function (item) {
                var index = vm.selectedFolder.children.indexOf(item);
                if(index > -1){
                    vm.selectedFolder.children.splice(index, 1);
                }
            });
        }

        function toggleMenuCollapse () {
            vm.isMenuCollapsed = !vm.isMenuCollapsed;
        }

        function getPaginationValues () {
            return {
                totalItems: 4,
                itemsPerPage: 2,
                maxSize: 4,
                currentPage: 1
            };
        }

        function pageChanged () {
            console.log(vm.pagination.currentPage);
        }
        
        function getmenuOptions () {
            return [
                ['Select Folder Permission', rightClickMenuHandler],
                ['Copy', rightClickMenuHandler],
                ['Delete', rightClickMenuHandler],
                ['Download', rightClickMenuHandler],
                ['Copy to personal space', rightClickMenuHandler],
            ];
        }
        
        function rightClickMenuHandler ($itemScope, $event, modelValue, text, $li) {
            console.log($li);
        }
    }

})();