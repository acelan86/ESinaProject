define([
    "../../../lib/AceFlux/Flux.js",
    "react", "lib/components/Table",
    "lib/components/MultiSelectList"
], function (
    Flux,
    React,
    Table,
    MultiSelectList
) {
    
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

    var SelectListStore = Flux.createStore({
        data: [],
        getState: function () {
            return {
                selectlist: this.data
            };
        },
        fill: function (data) {
            this.data = data;
            this.emit("change");
        },
        actions: {
            "render-select": "fill"
        }
    });
    var selectlist = new SelectListStore();


    /*
     * Dispatcher
     */
    var dispatcher = Flux.createDispatcher({
        render: function (data) {
            this.dispatch('render', data);
        },
        renderSelect: function (data) {
            this.dispatch('render-select', data);
        },
        getStores: function () {
            return {
                list: listStore,
                selectlist: selectlist
            };
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

    var selectaction = {
        fetch: function (id) {
            $.getJSON('/data/select.json', {id: id})
                .done(function (data) {
                    dispatcher.renderSelect(data);
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
            selectaction.fetch(this.props.params.id);
        },
        handleRefreshList: function () {
            actions.fetch(this.props.params.id);
        },
        handleGetSelection: function () {
            console.log(this.refs.mulitselectlist.val());
        },
        render: function () {
            var fields = [
                {name: "name", field: "name"},
                {name: "tel", field: "tel"},
                {name: "age", field: "age"}
            ];

            return (
                <div>
                    <input type="button" value="refresh" onClick={this.handleRefreshList}/>
                    <Table fields={fields} datasource={this.getStore('list').list} />
                    <MultiSelectList ref="mulitselectlist" datasource={this.getStore('selectlist').selectlist} />
                    <input type="button" value="get selection" onClick={this.handleGetSelection} />
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