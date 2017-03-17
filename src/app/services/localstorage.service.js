// storage.js
(function (app) {
    'use strict';

    
    app.factory('storage', storage)

    storage.$inject = ['$localStorage'];

    function storage($localStorage) {
        return {
            getSlides: getSlides,
        }

        function getSlides(url) {
            return $localStorage[url];
        }

        function saveSlides(url, books) {
            $localStorage[url] = books;
        }


    }
})(angular.module('app'));