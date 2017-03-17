(function (app) {
    "use strict";

    app.controller("controller.download", controller);

    controller.$inject = ["dataservice", "config"];

    function controller(dataservice, config) {
        var self = this;
        self.title = "Documents à télécharger";
        self.documents = {};
        self.contents = config.DIST;
        dataservice.getDocuments()
            .then(function (response) {
                self.documents = response;
            });

    };
} (angular.module("app")));        