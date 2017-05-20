// storage.js
(function (app) {
    'use strict';


    app.factory('storage', storage)

    storage.$inject = ['$localStorage', '$q'];

    function storage($localStorage, $q) {
        return {
            getData: getData,
            saveData: saveData
        }
        var storageName = "idrissdatav1";
        function getData() {
            var deferred = $q.defer();
            var data = $localStorage[storageName];
            if(!data){
                return null ;
            } 

            deferred.resolve(data);
            return deferred.promise;

        }

        function saveData(data) {
            $localStorage[storageName] = data;
        }


    }
})(angular.module('app'));