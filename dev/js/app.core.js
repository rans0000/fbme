/*jshint browser: true*/
/*global angular: true*/
/*global jQuery: true*/

(function(){
    'use strict';

    angular.module('app.core', [
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.contextMenu',
        'collaboration.module'
    ])
        .config(routerConfiguration)
        .config(debugConfiguration)
        .factory('jQuery', jQueryService)
        .controller('CoreController', CoreController);

    //--------------------------------------
    //function definitions

    function CoreController () {
        var vm = this;
        vm.currentPage = 'page-outer';
    }

    routerConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routerConfiguration ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('collaborationListing', {
            url: '/',
            templateUrl: 'js/modules/collaboration/collaborationListTemplate.html',
            controller: 'CollaborationListController',
            controllerAs: 'CollaborationListVM'
        })
            .state('collaborationDetails', {
            url: '/details/{collaborationId:int}',
            templateUrl: 'js/modules/collaboration/collaborationDetailsTemplate.html',
            controller: 'CollaborationDetailsController',
            controllerAs: 'CollaborationVM'
        });
    }
    
    function jQueryService () {
        return jQuery;
    }

    debugConfiguration.$inject = ['$compileProvider'];
    function debugConfiguration ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }

})();