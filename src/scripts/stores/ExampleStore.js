/**
 * store实例
 * 1、存储model数据
 * 2、提供存取方法
 * 3、挂载与该store相关的dispatcher action回调事件
 * 当有多个store触发同一个事件的时候，如何保证这个事件一定是在所有不同的store都执行完成后才执行?
 */
define(["scripts/AppDispatcher", "lib/flux/Store"], function (dispatcher, Store) {
   "use strict";

    var obj = {
        name: "acelan",
        value: 1
    };

    var store = new Store();

    _.extend(store, {
        get: function () {
            return obj;
        },
        set: function (name, value) {
            obj.name = name;
            obj.value = value;
            this.trigger('change');
        }
    });

    dispatcher.on('change-example', function (name, value) {
        store.set(name, value);
    });

    return store;
});