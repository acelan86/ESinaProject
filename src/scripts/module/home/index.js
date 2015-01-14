define(["backbone"], function (Backbone) {
    App.Models.Home = Backbone.Model.extend({});

    App.Collections.Home = Backbone.Collection.extend({
        model: App.Models.Home
    });

    App.Views.Home = Backbone.View.extend({
        el: '#container',
        initialize: function(c) {
            this.Collections = c;
            this.render();
        },
        render: function() {
            var html = '';
            this.Collections.each(function(m) {
                html += '<div><a href="' + m.get('link') + '">' + m.get('name') + '</a></div>';
            });
            this.$el.html(html);
        }
    })

    return function (params) {
        console.log(params);
        //模拟数据
        var hc = new App.Collections.Home();
        hc.add([
            {'name': 'home', 'link': '#home/index/a:moduleA/other:nothing'},
            {'name': 'group', 'link': '#group/index'}
        ]);
        new App.Views.Home(hc);
    }
});