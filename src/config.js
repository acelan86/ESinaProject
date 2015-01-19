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
        "react.backbone.mixin": "lib/backbone-react-component/lib/component"
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
        },
        "react.backbone.mixin": {
            deps: ["react"]
        }
    },
    map: {
        "*": {
            css: "lib/require-css/css"
        }
    }
});
