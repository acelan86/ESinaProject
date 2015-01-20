define(function () {
    "use strict";

    var actions = {
        addTodo: function(text) {
            this.dispatch("add-todo", {text: text});
        },

        clearTodos: function() {
            this.dispatch("clear-todos");
        }
    };

    return actions;
});