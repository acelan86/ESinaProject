define(["backbone", "underscore"], function (Backbone, _) {
    "use strict";

    function Dispatcher() {};
    _.extend(Dispatcher.prototype, Backbone.Events);

    return Dispatcher;
});