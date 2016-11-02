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
        vm.deleteCollaborationItem = deleteCollaborationItem;

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
    }

})();