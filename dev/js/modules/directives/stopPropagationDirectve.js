/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('app.core')
        .directive('stopPropagation', stopPropagationDirective);

    function stopPropagationDirective () {
        var directiveObject = {
            replace: true,
            restrict: 'A',
            scope: {
                collection: '='
            },
            link: stopPropagationLink,
            controller: TreeController,
            controllerAs: 'stopPropagation',
            bindToController: true
        };

        return directiveObject;

        function stopPropagationLink (scope, element, attributes, ctrl) {
            element.on('click', function (event) {
                event.stopPropagation();
            });
        }

        function TreeController () {
            var vm = this;
        }
    }
})();