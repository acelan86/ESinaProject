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
     * store bind dispatch name
     * and file change
     */
    var TodoStore = Fluxxor.createStore({
        initialize: function() {
            this.todos = [];

            this.bindActions(
                "add-todo", this.onAddTodo,
                "clear-todos", this.onClearTodos,
                "init-todos", this.onInitTodo
            );
        },
        onInitTodo: function (payload) {
            Array.prototype.push.apply(this.todos, payload);
            this.emit("change");
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
     * action fire dispatch name
     */
     var actions = {
        initTodos: function () {
            $.getJSON("/data/todos.json")
                .done(function (todos) {
                    this.dispatch("init-todos", todos);
                }.bind(this));
        },
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


    /**
     * view 里面只能触发action的方法
     * init
     */
    var View = React.createClass({
        //配置需要用到的store列表
        stores: ["TodoStore"],
        //感觉这些可以自动做，封装一下
        mixins: [
            Fluxxor.FluxMixin(React),
            Fluxxor.StoreWatchMixin("TodoStore")
        ],
        //必须有，用于将store的内容放到status里面
        //这步是不是可以通过配置一个store表进行自动操作
        getStateFromFlux: function() {
            var state = {},
                flux = this.getFlux();
            this.stores.map(function (name) {
                state[name] = flux.store(name).getState();
            });
            return state;
        },
        //自动处理结束
        
        getInitialState: function() {
            return {
                newTodoText: ""
            };
        },

        componentDidMount: function() {
            this.getFlux().actions.initTodos();
        },

        render: function() {
            var todos = this.state.TodoStore.todos.map(function (todo, i) {
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