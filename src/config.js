requirejs.config({
    baseUrl: "./",
    paths: {
        react: "lib/react",
        jquery: "lib/jquery",
        backbone: "lib/backbone",
        underscore: "lib/underscore",


        //routers
        "home/index" : "js/module/home/index",
        "group/index" : "js/module/group/index"
    },
    shim: {
        jquery : {
            exports: "$"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
    },
    map: {
        "*": {
            css: "lib/css"
        }
    }
});
