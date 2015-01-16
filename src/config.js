/**
 * require全局配置项
 */
requirejs.config({
    baseUrl: "./",
    paths: {
        react: "lib/react/react",
        jquery: "lib/jquery/dist/jquery",
        backbone: "lib/backbone/backbone",
        underscore: "lib/underscore/underscore",
        "react-bootstrap": "lib/react-bootstrap/react-bootstrap"
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
        "react-bootstrap": ["react"]
    },
    map: {
        "*": {
            css: "lib/require-css/css"
        }
    }
});
