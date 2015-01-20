define(["fluxxor"], function (Fluxxor) {
    "use strict";

    var TodoStore = Fluxxor.createStore({
        initialize: function() {
            this.todos = [];

            this.bindActions(
                "add-todo", this.onAddTodo,
                "clear-todos", this.onClearTodos
            );
        },

        onAddTodo: function(payload) {
            this.todos.push({
                text: payload.text,
                complete: false
            });
            this.emit("change");
        },

        onClearTodos: function() {
            this.todos = this.todos.filter(function(todo) {
                return !todo.complete;
            });
            this.emit("change");
        },

        getState: function() {
            return {
                todos: this.todos
            };
        }
    });

    return TodoStore;
});