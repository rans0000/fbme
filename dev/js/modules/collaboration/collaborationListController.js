/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('collaboration.module')
        .controller('CollaborationListController', CollaborationListController);

    CollaborationListController.$inject = ['collaborationService'];
    function CollaborationListController (collaborationService) {
        var vm = this;
        vm.isModelOpen = false;
        vm.collaborationList = [];
        vm.filterText = '';
        vm.newCollaboration = null;
        vm.startDateOpen= false;
        vm.expiryDateOpen= false;
        vm.format= 'dd-MMMM-yyyy';
        vm.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.pagination = getPaginationValues();

        vm.deleteCollaborationItem = deleteCollaborationItem;
        vm.activateCollaborationDialog = activateCollaborationDialog;
        vm.createCollaborationItem = createCollaborationItem;
        vm.pageChanged = pageChanged;
        vm.open1 = open1;
        vm.open2 = open2;

        init();

        //--------------------------------------
        //function declarations
        function init () {
            collaborationService.getCollaborationList()
                .then(getCollaborationListSuccess)
                .catch(getCollaborationListError);
        }

        function getCollaborationListSuccess (collaborationList) {
            vm.collaborationList = collaborationList;
        }

        function getCollaborationListError (error) {
            //a crude error handling
            var errMessage = 'Error: ' + error.status + ' ' + error.statusText;
            alert(errMessage);
        }

        function deleteCollaborationItem (item) {
            var index = vm.collaborationList.indexOf(item);
            vm.collaborationList.splice(index, 1);
        }

        function activateCollaborationDialog (state) {
            vm.isModelOpen = state;
            vm.newCollaboration = state? collaborationService.getNewCollaborationObject() : null;
        }

        function createCollaborationItem (item) {
            if(collaborationService.validateCollaborationItem(item)){
                //code to call service to add new object in DB here...
                vm.collaborationList.push(item);
                vm.isModelOpen = false;
            }
            else{
                alert('Invalid fields');
            }
        }

        function open1 () {
            vm.startDateOpen = true;
        }
        function open2 () {
            vm.expiryDateOpen = true;
        }

        function pageChanged () {
            console.log(vm.pagination.currentPage);
        }

        function getPaginationValues () {
            return {
                totalItems: 4,
                itemsPerPage: 2,
                maxSize: 4,
                currentPage: 1
            };
        }

    }

})();