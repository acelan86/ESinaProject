define([
    "backbone",
    "css!styles/group"
], function (Backbone) {
    App.Models.Group = Backbone.Model.extend({});

    App.Collections.Group = Backbone.Collection.extend({
        model: App.Models.Group
    });

    App.Views.Group = Backbone.View.extend({
        el: '#container',
        initialize: function (c) {
            this.Collections = c;
            this.render();
        },
        render: function() {
            var html = '';
            this.Collections.each(function (m) {
                html += '<div><a href="' + m.get('link') + '">' + m.get('name') + '</a></div>';
            });
            this.$el.html(html);
        }
    })

    return function (params) {
        console.log(params);
        //模拟数据
        var hc = new App.Collections.Group();
        hc.add([
            {'name': 'baidu', 'link': 'http://baidu.com'},
            {'name': "return home", "link": "#home/index"}
        ]);
        new App.Views.Group(hc);
    }
});