(function (app) {
    "use strict";

    app.controller("controller.main", controller);

    controller.$inject = ["dataservice", "config"];

    function controller(dataservice, config) {
        var self = this;
        init();

        function init() {
            self.contents = config.DIST;
            self.slides = {
                list: []
            };

        }

    };
}(angular.module("app")));        