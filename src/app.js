define(["require","backbone"], function(require, Backbone) {
    //配置路由
    var autoRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            ':module/:action(~*condition)': 'loadmodule'
        },
        home: function() {
            this.loadmodule('home', 'index');
        },
        //按照module/action(/conditions)格式的請求自動加載模塊
        loadmodule: function(md, ac, con) {
            //将参数字符串'a:123/b:456'转换为json对象{a:123, b:456}
            var cj = {};
            if(con && con.indexOf(':') > -1) {
                con.replace(/(\w+)\s*:\s*([\w-]+)/g, function (a, b, c) {
                    b && (cj[b] = c);
                });
            } else {
                cj = con;
            }
            //加载module目录下对应的模块
            require([[md, ac].join('/')], function (cb) {
                if(cb) {
                    cb(cj);
                } else {
                    alert('模块加载失败！');
                }
            })
        }
    });

    //定义全局变量App
    window.App = {
        Models: {},  
        Views: {},  
        Collections: {},
        initialize: function() {
            new autoRouter();
            Backbone.history.start();
        }  
    };

    return {
        run : App.initialize
    };
});