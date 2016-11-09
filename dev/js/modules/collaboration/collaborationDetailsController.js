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

        vm.toggleFavouriteStatus = toggleFavouriteStatus;
        vm.toggleFavouriteText = toggleFavouriteText;
        vm.onItemSelected = onItemSelected;
        vm.shareItem = shareItem;
        vm.onEditselectedItemSubmit = onEditselectedItemSubmit;
        vm.populateSelectedFolder = populateSelectedFolder;
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
            //vm.selectedItemCopy = angular.copy(item);
            vm.selectedItemList = $filter('filter')(vm.selectedFolder.children, {checked: true});
            //console.log(vm.selectedItemList);
            if(vm.selectedItemList.length === 1){
                vm.selectedItem = vm.selectedItemList[0];
                vm.selectedItemCopy = angular.copy(vm.selectedItemList[0]);
            }
            else{
               vm.selectedItem = null;
                vm.selectedItemCopy = null;
            }
        }

        function onEditselectedItemSubmit () {
            var isValid = collaborationService.editFileFolderItem(vm.selectedItem, vm.selectedItemCopy);
            if(isValid){
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
                console.log(value);
                value.checked = false;
            });
            $scope.$broadcast('folderSelectFromExplorer', item);
        }
    }

})();