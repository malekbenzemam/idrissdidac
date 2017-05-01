(function (app) {
    "use strict";

    app.config(configure);

    configure.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function configure($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: "dist/views/main.html",
                controller: "controller.main",
                controllerAs: "vm"
            })
            .state('categories', {
                url: '/categories/:categorie/:subCategorie',
                templateUrl: "dist/views/categories.html",
                controller: "controller.categories",
                controllerAs: "vm"
            })
            .state('about', {
                url: '/about',
                templateUrl: "dist/views/about.html",
                controller: "controller.about",
                controllerAs: "vm"
            })
            .state('contact', {
                url: '/contact',
                templateUrl: "dist/views/contact.html",
                controller: "controller.contact",
                controllerAs: "vm"
            })
            .state('products', {
                url: '/products/:categorie/:subCategorie/:product',
                templateUrl: "dist/views/products.html",
                controller: "controller.products",
                controllerAs: "vm"
            });


    };

} (angular.module("app")));