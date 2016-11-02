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
        return serviceObject;

        //--------------------------------------
        //function definitions
        function getCollaborationList () {
            return $http.get('data/collaboration-list.json')
                .then(function (response) {
                return response.data.collaborationList;
            });
        }
    }

})();