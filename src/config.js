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
        "react.bootstrap": "lib/react-bootstrap/react-bootstrap",
        "fluxxor": "lib/fluxxor/build/fluxxor",
        "delorean": "lib/delorean/dist/delorean.amd",
        "eventEmitter": "lib/eventEmitter/EventEmitter",
        "promise": "lib/es6-promise/promise"
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
        "react.bootstrap": {
            deps: ["react"]
        }
    },
    map: {
        "*": {
            css: "lib/require-css/css"
        }
    }
});
