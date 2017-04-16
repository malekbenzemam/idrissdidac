(function (app) {
    "use strict";

    app.controller("controller.categories", controller);

    controller.$inject = ["config", "$stateParams", "dataservice"];
    function controller(config, $stateParams, dataservice) {

        var self = this;
        self.images = {};
        init();

        self.categorie = $stateParams.categorie;
        self.subCategorie = $stateParams.subCategorie;
        console.log("Category selected ", $stateParams)
        self.contents = config.DIST;

        function init() {
            dataservice.getData()
                .then(function (data) {
                    var data = data.children;
                    angular.forEach(data, function (element) {
                        if (element.name === self.categorie) {
                            if (!self.subCategorie) {
                                this.images = element.children;
                            }
                            else {
                                angular.forEach(element.children, function (element) {
                                    if (element.name === self.subCategorie) {
                                        this.images = element.children;
                                    }

                                }, self)
                            }
                        }
                    }, self);
                    console.log(self.images);
                });

        }
    };
}(angular.module("app")));        