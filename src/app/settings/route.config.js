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
                templateUrl: "views/main.html",
                controller: "controller.main",
                controllerAs: "vm"
            })
            .state('about', {
                url: '/about',
                templateUrl: "views/about.html",
                controller: "controller.about",
                controllerAs: "vm"
            })
            .state('contact', {
                url: '/contact',
                templateUrl: "views/contact.html",
                controller: "controller.contact",
                controllerAs: "vm"
            })
            .state('download', {
                url: '/download',
                templateUrl: "views/download.html",
                controller: "controller.download",
                controllerAs: "vm"
            });


    };

} (angular.module("app")));