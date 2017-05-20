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

        function getData() {
            var deferred = $q.defer();
            var data = $localStorage["idrissdata"];
            if(!data){
                return null ;
            } 

            deferred.resolve(data);
            return deferred.promise;

        }

        function saveData(data) {
            $localStorage["idrissdata"] = data;
        }


    }
})(angular.module('app'));