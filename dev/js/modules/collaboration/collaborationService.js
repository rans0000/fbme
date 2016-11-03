/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('collaboration.module')
        .factory('collaborationService', collaborationService);

    collaborationService.$inject = ['$http'];
    function collaborationService ($http) {
        var serviceObject = {};
        serviceObject.getCollaborationList = getCollaborationList;
        serviceObject.getNewCollaborationObject = getNewCollaborationObject;
        serviceObject.validateCollaborationItem = validateCollaborationItem;
        serviceObject.getCollaborationDetails = getCollaborationDetails;
        serviceObject.editFileFolderItem = editFileFolderItem;
        return serviceObject;

        //--------------------------------------
        //function definitions
        function getCollaborationList () {
            return $http.get('data/collaboration-list.json')
                .then(function (response) {
                return response.data.collaborationList;
            });
        }

        function getNewCollaborationObject () {
            return {
                id: (Math.floor(Math.random() * 1000) + 10),
                name: '',
                description: '',
                titleHolder: '',
                startDate: new Date(),
                expiryDate: new Date(),
                status: 'Active'
            };
        }

        function validateCollaborationItem (item) {
            var isValid = true;
            if(item !== null){
                if(item.name === '' || item.titleHolder === ''){
                    isValid = false;
                }
            }

            if(!validateDate(item.startDate) || !validateDate(item.expiryDate)){
                isValid = false;
            }

            return isValid;
        }

        function getCollaborationDetails () {
            return $http.get('data/collaboration-details.json')
                .then(function (response) {
                return response.data.collaborationDetails.items;
            });
        }

        function validateDate (date) {
            //simple date validation
            var isValid;
            if ( Object.prototype.toString.call(date) === "[object Date]" ) {
                // it is a date
                if ( isNaN( date.getTime())){
                    isValid = false; // date is not valid
                }
                else {
                    isValid = true;
                }
            }
            else {
                isValid = false; // not a date
            }

            return isValid;
        }
    }

    function validateFileFolderItem (item) {
        var isValid = false;
        if(item.title || item.description){
            isValid = true;
        }
        return isValid;
    }

    function editFileFolderItem (original, copy) {
        var isSuccess = validateFileFolderItem(copy);
        if(isSuccess){
            original.title = copy.title;
            original.description = copy.description;
            original.tag = copy.tag;
            original.fileCategory = copy.fileCategory;
        }
        return isSuccess;
    }

})();