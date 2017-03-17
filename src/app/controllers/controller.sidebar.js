(function (app) {
    "use strict";

    app.controller("controller.sidebar", controller);

    controller.$inject = ["dataservice", "config"];

    function controller(dataservice, config) {
        var self = this;
        init();

        function init() {
            self.contents = config.DIST;
            self.categoryTitle = "Categories";
            dataservice.getSideBarbis().then(function(data){
            console.log("from controller", data);
                self.categories = data;
            });
            // self.categories = dataservice.getSideBar();

        }

    };
}(angular.module("app")));        