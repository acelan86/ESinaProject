define(["../../../lib/AceFlux/Flux.js", "react", "./test.js"], function (Flux, React, test) {
    
    /**
     * Store
     */
    var Store = Flux.createStore({
        data: [],
        clearTodos: function () {
            this.data = [];
        },
        initTodos: function (data) {
            this.data = data;
            this.emit('change');
        },
        addTodo: function (data) {
            this.data.push(data);
            this.emit('change');
        },
        addTodoSucc: function (id) {
            this.data.map(function (data) {
                if (data.id === id) {
                    data.doing = false;
                }
            });
            this.emit('change');
        },
        addTodoFail: function (id) {
            this.data.map(function (data) {
                if (data.id === id) {
                    data.error = true;
                    data.doing = false;
                }
            });
            this.emit('change');
        },

        actions: {
            'init-todos': 'initTodos',
            'add-todo': 'addTodo',
            'add-todo-succ': 'addTodoSucc',
            'add-todo-fail': 'addTodoFail',
            'clear-todos': 'clearTodos'
        },

        getState: function () {
            return {
                todos: this.data
            };
        }
    });
    var store = new Store();


    /*
     * Dispatcher
     */
    var dispatcher = Flux.createDispatcher({
        initTodos: function (data) {
            this.dispatch('init-todos', data);
        },
        addTodo: function (data) {
            this.dispatch('add-todo', data);
        },
        addTodoSucc: function (id) {
            this.dispatch('add-todo-succ', id);
        },
        addTodoFail: function (id) {
            this.dispatch('add-todo-fail', id);
        },
        clearTodos: function (data) {
            this.dispatch('clear-todos');
        },
        getStores: function () {
            return {
                store: store
            }
        }
    });


    /*
     * Action
     */
    var actions = {
        initTodos: function (id) {
            $.getJSON('/data/todos.json', {id: id})
                .done(function (data) {
                    dispatcher.initTodos(data);
                });
        },
        addTodo: function (text) {
            var id = (+new Date()).toString(36);
            dispatcher.addTodo({id: id, text: text, doing: true});

            $.getJSON('/data/todos.json')
                .done(function () {
                    dispatcher.addTodoSucc(id);
                })
                .fail(function () {
                    dispatcher.addTodoFail(id);
                });
        },
        clearTodos: function () {
            dispatcher.clearTodos();
        }
    };

    /**
     * View
     */
    var View = React.createClass({
        mixins: [Flux.mixins.storeListener],
        getInitialState: function () {
            return {
                newTodoText: ""
            };
        },
        //首次渲染view
        componentDidMount: function () {
            actions.initTodos(this.props.params.todoid);
        },

        handleTodoTextChange: function(e) {
            this.setState({
                newTodoText: e.target.value
            });
        },
        onSubmitForm: function(e) {
            e.preventDefault();
            if (this.state.newTodoText.trim()) {
                actions.addTodo(
                    this.state.newTodoText
                );
                this.setState({
                    newTodoText: ""
                });
            }
        },
        render: function () {
            var todos = this.getStore('store').todos.map(function (todo, i) {
                return <li key={i}>{todo.text} <span style={!todo.error ? {color:'#ccc'} : {color: '#f00'}}>{todo.doing ? ' loading...' : todo.error ? 'fail add!' : ''}</span></li>;
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
        }
    });

    return function (params) {
        //渲染view
        React.render(
            <View dispatcher={dispatcher} params={params}/>,
            document.getElementById('Main')
        );
    };
});