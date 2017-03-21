// dataservice factory
(function (app) {

    app.factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'storage', 'config'];

    function dataservice($http, storage, config) {

        return {
            getSlides: getSlides,
            getDocuments: getDocuments,
            getSideBar: getSideBar
        };

        function dirTree(categories) {

            if (categories.type == "folder") {


                var info = {
                    path: categories.path,
                    name: categories.name,
                    type: categories.type
                };

                info.children = categories.children
                    .filter(function (x) {
                        return x.type == 'folder'
                    })
                    .map(function (child) {
                        return dirTree(child);
                    });

                return info;
            }

        }


        function getSideBar() {
            return $http.get(config.DATA)
                .then(function (response) {
                    console.log(response);
                    data = dirTree(response.data);
                    return data.children;
                });
        }


        function getSlides() {
            return $http.get(config.SLIDES)
                .then(function (response) {
                    return response.data.slides;
                });
        };

        function getDocuments() {
            return $http.get(config.DOCUMENTS)
                .then(function (response) {
                    angular.forEach(response.data.docs, function (doc) {
                        doc.filename = getFileName(doc.path);
                    });
                    return response.data;
                });

        };

        function getFileName(fullPath) {
            var filename = fullPath.replace(/^.*[\\\/]/, '');
            return filename.substring(0, filename.indexOf('.'))

        };

        function getOneComplete(response) {
            return response.data;
        };

        function getAllComplete(response) {
            return response.data;
        };

        function getAllFailed(error) {
            logger.error('XHR Failed .' + error.data);
        };
    }
}(angular.module('app')));