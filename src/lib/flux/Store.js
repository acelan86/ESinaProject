define(["underscore", "backbone"], function (_, backbone) {
    "use strict";

    var Store = function () {};

    _.extend(Store.prototype, Backbone.Events);

    return Store;
});