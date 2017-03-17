(function () {
    "use strict";

    angular.module("app", ['ui.router', 'ngStorage'])
        .constant("config", {
            URL: "https://idrissdidac.com",
            DIST:"/dist",
            DATA: "/api/data.json",
            DOCUMENTS: "/api/documents.json",
            SLIDES: "/api/slides.json"
        });

} ());