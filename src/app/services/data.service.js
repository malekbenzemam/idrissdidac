// dataservice factory
(function (app) {

    app.factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'storage', 'config'];

    function dataservice($http, storage, config) {

        return {
            getSlides: getSlides,
            getDocuments: getDocuments,
            getSideBar: getSideBar,
            getData: getData,
            getProducts: getProducts,
            getProduct: getProduct
        };

        function dirTree(categories) {

            if (categories.type == "folder") {


                var info = {
                    // path: categories.path,
                    name: categories.name,
                    urlname: categories.urlname,
                    discription: categories.discription,
                    id: categories.id,
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

        function getData() {
            return getAllData();
        }
        function getAllData() {
            var data =  storage.getData();

            if (data) {
                console.log('From cache');
                return data;
            }

            return $http.get(config.DATA)
                .then(function (response) {
                    console.log("From server  ");
                    storage.saveData(response.data);
                    return response.data;
                });

        }

        function getProducts(categoryName, subCategoryName, fn) {
            if (subCategoryName == 0) {
                var subCategoryName = "";
            }
            console.log("sub ", subCategoryName);
            getData()
                .then(function (data) {
                    angular.forEach(data.children, function (category) {
                        if (category.urlname === categoryName) {
                            if (!subCategoryName) {
                                category.categorie = category.name;
                                return fn(category);
                            }
                            console.log("Subcategorie searche ");
                            angular.forEach(category.children, function (subCategory) {
                                if (subCategory.urlname === subCategoryName) {
                                    subCategory.categorie = category.name;
                                    subCategory.subCategorie = subCategory.name;
                                    return fn(subCategory);
                                }

                            })

                        }
                    });

                });

        }

        function getProduct(category, subCategory, productId, fn) {
            getProducts(category, subCategory, function (prods) {
                prod = prods.children.filter(function (prod, index) {
                    return prod.urlname == productId;
                })[0];

                prod.path = prod.path.replace('/categories/', '/projects/')
                fn(prods, prod.id);

            });
        }
        function getSideBar() {
            return getAllData()
                .then(function (response) {
                    data = dirTree(response);
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