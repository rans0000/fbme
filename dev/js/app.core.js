/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('app.core', [])
        .controller('CoreController', CoreController);

    function CoreController () {
        var vm = this;
        vm.value= 33;
    }

})();