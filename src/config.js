requirejs.config({
    baseUrl: "./",
    paths: {
        react: "lib/react",
        jquery: "lib/jquery",
        backbone: "lib/backbone",
        underscore: "lib/underscore"
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