define([
    "backbone",
    "react",
    "lib/UINav/UINav",
    "css!styles/group"
], function (Backbone, React, UINav) {

    App.Models.Item = Backbone.Model.extend({});

    App.Collections.Items = Backbone.Collection.extend({
        model: App.Models.Item
    });
    

    App.Views.Group = Backbone.View.extend({
        el: '#Main',
        initialize: function (items) {
            this.items = items;
            this.render();
        },
        addHandler: function () {
            //alert('add');
            this.items.add([
                {
                    name: 'item' + (+new Date()).toString(36)
                    //link: '#home/index/a:1/b:2'
                }
            ]);
        },
        removeHandler: function (cid) {
            //alert('add');
            this.items.remove(cid);
        },
        render: function() {
            React.render(
                <div>
                    <a href="#home/index/a:1/b:2">return home</a>
                    <UINav 
                        onadd={$.proxy(this.addHandler, this)} 
                        onremove={$.proxy(this.removeHandler, this)} 
                        items={this.items} />
                </div>,
                this.el
            );
        }
    })

    return function (params) {
        console.log(params);
        //模拟数据
        var items = new App.Collections.Items([
            {
                name: 'add'
                //link: 'http://baidu.com',
                //blank: true
            }
        ]);
        new App.Views.Group(items);
    }
});