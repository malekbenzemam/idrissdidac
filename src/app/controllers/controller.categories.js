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
            },
            next: function () {

                var next = (this.page + 1) % (this.totalPage() + 1);
                console.log("next : " , next)
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
                                this.products.all = element.children;
                            }
                            else {
                                angular.forEach(element.children, function (element) {
                                    if (element.name === self.subCategorie) {
                                        this.products.all = element.children;
                                    }
                                    
                                }, self)
                            }
                        }
                    }, self);
                    self.products.gotoPage(1);
                    console.log("Products", self.products);
                });

        }
    };
}(angular.module("app")));        