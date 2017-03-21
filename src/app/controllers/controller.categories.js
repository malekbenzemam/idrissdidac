(function (app) {
    "use strict";

    app.controller("controller.categories", controller);

    controller.$inject = ["config", "$stateParams"];
    function controller(config, $stateParams) {

        var self = this;
        self.categorie = $stateParams.categorie;
        self.subCategorie = $stateParams.subCategorie;
        console.log("Category ", $stateParams)
        self.contents = config.DIST;
    };
}(angular.module("app")));        