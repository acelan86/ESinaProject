/**
 * 全局Dispatcher实例
 * 其实就是个事件管理器
 */
define(["lib/flux/Dispatcher"], function (Dispatcher) {
    "use strict";

    return new Dispatcher; 
});