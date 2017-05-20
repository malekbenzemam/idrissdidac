(function (app) {
    "use strict";

    app.controller("controller.categories", controller);

    controller.$inject = ["config", "$stateParams", "dataservice"];
    function controller(config, $stateParams, dataservice) {

        var self = this;

        self.products = {
            page: 1,
            all: [],
            products: [],
            gotoPage: function (thePage) {
                var from = (thePage - 1) * 12;
                var to = from + 12;
                to = to < this.total() ? to : this.total();
                this.products = this.all.slice(from, to);
                this.page = thePage;
                // console.log("Products", self.products);
            },
            next: function () {

                var next = (this.page + 1) % (this.totalPage() + 1);
                // console.log("next : ", next)
                next = next || 1;
                this.gotoPage(next);
            },
            prior: function () {
                var next = (this.page - 1) % this.totalPage();
                next = next || this.totalPage();

                this.gotoPage(next);
            },
            total: function () {
                return this.all.length;
            },
            totalPage: function () {
                return Math.ceil(this.total() / 12);
            }

        };


        self.categorie = $stateParams.categorie;
        self.subCategorie = $stateParams.subCategorie;
        // console.log("Category selected ", $stateParams)
        self.contents = config.DIST;

        init();


        function init() {
            dataservice.getProducts(self.categorie, self.subCategorie,
                function (data) {
                    self.categorieTitle = data.categorie;
                    self.subCategorieTitle = data.subCategorie;
                    // console.log("Products from getproduct ", data);
                    self.products.all = data.children;
                    self.products.gotoPage(1);
                });

        }
    };
}(angular.module("app")));        