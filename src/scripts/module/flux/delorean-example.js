define(["react", "delorean"], function (React, Delorean) {
    "use strict";

    var Flux = Delorean.Flux;
    /**
     * Store
     */
    var Store = Flux.createStore({
        data: [],
        initTodos: function (data) {
            Array.prototype.push.apply(this.data, data);
            this.emit('change');
        },
        get: function () {
            return this.data;
        },

        actions: {
            'init-todos': 'initTodos'
        }
    });
    var store = new Store();


    /*
     * Dispatcher
     */
    var Dispatcher = Flux.createDispatcher({
        initTodos: function (data) {
            this.dispatch('init-todos', data);
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
    var Actions = {
        initTodos: function () {
            $.getJSON('/data/example.json')
                .done(function (data) {
                    Dispatcher.initTodos(data);
                });
        }
    };

    /**
     * View
     */
    var View = React.createClass({
        mixins: [DeLorean.Flux.mixins.storeListener],
        getInitialState: function () {
            return {
                todos: []
            };
        },
        componentDidMount: function () {
            Actions.initTodos();
        },
        render: function () {
            var todos = this.getStore('store').todos.map(function (todo, i) {
                return <li key={i}>{todo.text}</li>;
            });
            return (
                <ul>
                    {todos}
                </ul>
            );
        }
    });

    return function () {
        React.render(
            <View />,
            document.getElementById('Main')
        );
    } 
});