define([
    "react",
    "fluxxor",
    //"scripts/stores/TodoStore",
    //"scripts/actions/TodoAction",
    "lib/components/Example.react"
], function (
    React,
    Fluxxor,
    // TodoStore,
    // todoAction,
    Example
) {
    "use strict";

    /**
     * Store
     */
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
    
    var stores = {
        TodoStore: new TodoStore()
    };

    /**
     * actions
     */
     var actions = {
        addTodo: function(text) {
            this.dispatch("add-todo", {text: text});
        },

        clearTodos: function() {
            this.dispatch("clear-todos");
        }
    };

    /**
     * flux
     */
    var flux = new Fluxxor.Flux(stores, actions);


    var View = React.createClass({
        mixins: [
            Fluxxor.FluxMixin(React),
            Fluxxor.StoreWatchMixin("TodoStore")
        ],
        getInitialState: function() {
            return {
                newTodoText: ""
            };
        },

        getStateFromFlux: function() {
            var flux = this.getFlux();
            return flux.store("TodoStore").getState();
        },

        render: function() {
            var todos = this.state.todos.map(function (todo, i) {
                return (
                    <li key={i}>
                        <Example name={todo.text} value={todo.text} />
                    </li>
                );
            });
            return (
              <div>
                <ul>
                    {todos}
                </ul>
                <form onSubmit={this.onSubmitForm}>
                    <input
                        type="text"
                        size="30"
                        placeholder="New Todo"
                        value={this.state.newTodoText}
                        onChange={this.handleTodoTextChange} />
                    <input type="submit" value="Add Todo" />
                </form>
              </div>
            );
        },

        handleTodoTextChange: function(e) {
            this.setState({
                newTodoText: e.target.value
            });
        },

        onSubmitForm: function(e) {
            e.preventDefault();
            if (this.state.newTodoText.trim()) {
                this.getFlux().actions.addTodo(
                    this.state.newTodoText
                );
                this.setState({
                    newTodoText: ""
                });
            }
        },
    });

    return function (params) {
        console.log(params);

        React.render(
            <View flux={flux} />,
            document.getElementById("Main")
        );
    }
});