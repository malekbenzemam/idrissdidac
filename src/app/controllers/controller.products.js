(function (app) {
    "use strict";

    app.controller("controller.products", controller);

    controller.$inject = ["config", "$stateParams", "dataservice"];
    function controller(config, $stateParams, dataservice) {

        var self = this;

        self.products = {
            page: 0,
            all: [],
            product: {},
            gotoPage: function (index) {
                this.page = index;
                console.log(" all : ", this.all);
                this.product = this.all[this.page];
                this.product.path = this.product.path.replace('/categories/', '/projects/')
            },
            next: function () {
                var next = (this.page + 1) % (this.all.length);
                this.gotoPage(next);
            },
            prior: function () {
                var next = this.page ? this.page - 1 : this.all.length - 1;
                this.gotoPage(next);
            },
            total: function () {
                return this.all.length;
            },
            current: function () {
                return this.page + 1;
            }

        };



        self.categorie = $stateParams.categorie;
        self.subCategorie = $stateParams.subCategorie;
        if (self.subCategorie == 0) {
            self.subCategorie = "";
        }
        self.productId = $stateParams.product;

        self.contents = config.DIST;

        init();
        function init() {
            dataservice.getProduct(self.categorie, self.subCategorie, self.productId, function (products, index) {
                self.categorieTitle = products.categorie;
                self.subCategorieTitle = products.subCategorie;

                self.products.all = products.children;
                self.products.gotoPage(index - 1);
                console.log('Product found ', products);

            })
        }
    };
}(angular.module("app")));        