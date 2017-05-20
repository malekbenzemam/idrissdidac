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
            dataservice.getSideBar()
                .then(function (data) {
                    self.categories = data;
                    //  console.log("Categories", data);
                });
            

        }

    };
}(angular.module("app")));        