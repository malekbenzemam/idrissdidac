(function (app) {
    "use strict";

    app.controller("controller.about", controller);

    controller.$inject = ["config"];
    function controller(config) {

        var self = this;
        self.contents = config.DIST;
    };
} (angular.module("app")));        