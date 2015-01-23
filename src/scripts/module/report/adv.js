define(["../../../lib/AceFlux/Flux.js", "react", "lib/components/Table", "lib/components/MultiSelectList"], function (Flux, React, Table, MultiSelectList) {
    
    /**
     * Store
     */
    var ListStore = Flux.createStore({
        data: [],
        clear: function () {
            this.data = [];
        },
        fill: function (data) {
            this.data = data;
            this.emit('change');
        },

        actions: {
            'render': 'fill'
        },

        getState: function () {
            return {
                list: this.data
            };
        }
    });
    var listStore = new ListStore();


    /*
     * Dispatcher
     */
    var dispatcher = Flux.createDispatcher({
        render: function (data) {
            this.dispatch('render', data);
        },
        getStores: function () {
            return {
                list: listStore
            }
        }
    });


    /*
     * Action
     */
    var actions = {
        fetch: function (id) {
            $.getJSON('/data/list.json', {id: id})
                .done(function (data) {
                    dispatcher.render(data);
                });
        }
    };

    /**
     * View
     */
    var View = React.createClass({
        mixins: [Flux.mixins.storeListener],
        //首次渲染view
        componentDidMount: function () {
            actions.fetch(this.props.params.id);
        },
        handleRefreshList: function () {
            actions.fetch(this.props.params.id);
        },
        render: function () {
            var fields = [
                {name: "name", field: "name"},
                {name: "tel", field: "tel"},
                {name: "age", field: "age"}
            ];

            var lists = [
                {text: "列表1", selected: 1},
                {text: "列表2"},
                {text: "列表3"}
            ];

            return (
                <div>
                    <input type="button" value="refresh" onClick={this.handleRefreshList}/>
                    <Table fields={fields} datasource={this.getStore('list').list} />
                    <MultiSelectList datasource={lists} />
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