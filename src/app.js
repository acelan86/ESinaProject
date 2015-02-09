/**
 * 根据自动路由表转换成模块加载
 * 并且启动app
 */
define([
    "require",
    "backbone"
], function(require, Backbone) {
    "use strict";

    //根据module, action获取uid
    var _getUID = (function () {
        var cache = {};

        function hash(s) {
            var hash = 0,
                i = 0,
                w;

            for (; !isNaN(w = s.charCodeAt(i++));) {
                hash = ((hash << 5) - hash) + w;
                hash = hash & hash;
            }

            return Math.abs(hash).toString(36);
        }

        return function (module, action) {
            var str = [module, action].join('_');
            return cache[str] || (cache[str] = hash(str), cache[str]);
        };
    })();

    function _getRevModulePath(module, action) {
        var map = window._APP_ROUTER_MAP || {};
        var oriModulePath = [module, action].join('/');
        return map[oriModulePath] || ["scripts", "module", oriModulePath].join('/');
    }

    //全局路由配置
    var autoRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            ':module/:action(/*params)': 'forward' //用于匹配所有除home外的路由
        },
        home: function() {
            this.forward('home', 'index');
        },
        //按照module/action(~*params)格式的自动加载对应路径下模块的模块
        forward: function(module, action, params) {
            //将参数字符串'a:123/b:456'转换为json对象{a:123, b:456}
            var paramsObject = {};
            if(params && params.indexOf(':') > -1) {
                params.replace(/(\w+)\s*:\s*([\w-\[\]\{\},]+)/g, function (param, key, value) {
                    key && (paramsObject[key] = value);
                });
            }
            
            console.log(_getUID(module, action));

            //加载module目录下对应的模块， 并将参数传递至对应模块
            require([_getRevModulePath(module, action)], function (actionInitiator) {
                if('function' === typeof actionInitiator) {
                    actionInitiator(paramsObject);
                }
            });
        }
    });

    //定义全局变量App
    //backbone标准范例
    window.App = {
        Models: {},  
        Views: {},  
        Collections: {},
        initialize: function(routerMap) {
            window.App.routerMap = routerMap || {};
            new autoRouter();
            Backbone.history.start();
        }  
    };

    return {
        run : App.initialize
    };
});