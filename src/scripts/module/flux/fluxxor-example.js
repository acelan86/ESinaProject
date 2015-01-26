define([
    "fluxxor",
    "react",
    "lib/components/MultiSelectList",
    "lib/components/Table"
], function (
    Fluxxor,
    React,
    MultiSelectList,
    Table
) {
    "use strict";

    //Store
    var SelectStore = Fluxxor.createStore({
        initialize: function() {
            this.data = [];
            this.bindActions("fetch-select-store", this.fill);
        },
        fill: function (data) {
            this.data = data;
            this.emit("change");
        },
        getState: function () {
            return this.data;
        }
    });

    var TableStore = Fluxxor.createStore({
        initialize: function () {
            this.data = [];
            this.bindActions("fetch-table-store", this.fill);
        },
        fill: function (data) {
            this.data = data;
            this.emit("change");
        },
        getState: function () {
            return this.data;
        }
    });

    //flux
    var flux = new Fluxxor.Flux(
        //stores
        {
            select: new SelectStore(),
            table: new TableStore()
        },
        //actions
        {
            fetchTable: function (id) {
                $.getJSON("/data/list.json", {id: id})
                    .done(function (data) {
                        this.dispatch("fetch-table-store", data);
                    }.bind(this));
            },
            fetchSelect: function (id) {
                $.getJSON("/data/select.json", {id: id})
                    .done(function (data) {
                        this.dispatch("fetch-select-store", data);
                    }.bind(this));
            }
        }
    );


    //view
    var View = React.createClass({
        mixins:[
            Fluxxor.FluxMixin(React),
            Fluxxor.StoreWatchMixin()
        ],
        componentWillMount: function () {
            var flux = this.getFlux();
            flux.actions.fetchSelect(this.props.params.id);
            flux.actions.fetchTable(this.props.params.id);
        },
        handleRefreshTable: function () {
            this.getFlux().actions.fetchTable(this.props.params.id);
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
                    <input type="button" value="refresh" onClick={this.handleRefreshTable}/>
                    <Table fields={fields} datasource={this.state.table} />
                    <MultiSelectList ref="mulitselectlist" datasource={this.state.select} />
                    <input type="button" value="get selection" onClick={this.handleGetSelection} />
                </div>
            );
        }
    });

    return function (params) {
        React.render(
            <View flux={flux} params={params}/>,
            document.getElementById("Main")
        );
    } 
});