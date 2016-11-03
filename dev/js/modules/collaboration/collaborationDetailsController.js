/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('collaboration.module')
        .controller('CollaborationDetailsController', CollaborationDetailsController);

    CollaborationDetailsController.$inject = ['collaborationService'];
    function CollaborationDetailsController (collaborationService) {
        var vm = this;
        vm.itemTree = [];
        vm.selectedFolder = {};
        vm.selectedFolderFilter = '';
        vm.selectedItem = {};
        vm.selectedItemCopy = null;

        vm.toggleFavouriteStatus = toggleFavouriteStatus;
        vm.toggleFavouriteText = toggleFavouriteText;
        vm.onItemSelected = onItemSelected;
        vm.shareItem = shareItem;
        vm.onEditselectedItemSubmit = onEditselectedItemSubmit;

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
            //vm.selectedFolder = response.length? response[0] : {};
            if(response.length && response[0].hasOwnProperty('children') && response[0].children.length ){
                vm.selectedFolder = response[0];
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

        function onItemSelected (item) {
            vm.selectedItemCopy = angular.copy(item);
            console.log(vm.selectedItemCopy);
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
    }

})();