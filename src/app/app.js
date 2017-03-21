(function () {
    "use strict";

    angular.module("app", ['ui.router', 'ngStorage'])
        .constant("config", {
            URL: "https://idrissdidac.com",
            DIST:"/dist",
            IMAGES:{
                root:"/dist/images/",
                categories: "/dist/images/products/categories",
                projects: "/dist/images/products/projects",
            },
            
            DATA: "/dist/api/data.json",
            DOCUMENTS: "/dist//api/documents.json",
            SLIDES: "/dist/api/slides.json"
        });

} ());