/*jshint browser: true*/
/*global angular: true*/

(function(){
    'use strict';

    angular.module('app.core')
        .directive('slideToggle', slideToggleDirective);

    slideToggleDirective.$inject = ['jQuery'];
    function slideToggleDirective ($) {
        var directiveObject = {
            restrict: 'A',
            link: slideToggleLink,
        };

        return directiveObject;

        function slideToggleLink (scope, element, attributes, ctrl) {
            var $element = $(element);
            element.on('click', function () {
                if($element.hasClass('active')){
                    $element.siblings('.menu-tree').slideDown();
                }
                else{
                    $element.siblings('.menu-tree').slideUp();
                }
            });
        }
    }
})();