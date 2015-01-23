define(["react"], function (React) {
    "use strict";

    var MultiSelectList = React.createClass({
        getDefaultProps: function () {
            return {
                datasource : [] //全集数据 文本，是否选中，是否激活{text: text, selected: 1}
            };
        },
        getInitialState: function () {
            return {
                all: [],
                lefts: [],
                rights: []
            };
        },

        componentDidMount: function () {
            var lr = this._getLeftRightfromDatasource();
            var all = this.props.datasource.map(function (row, i) {
                row.__uid = i;
                return row;
            });

            this.setState({
                all : all,
                lefts: lr.lefts,
                rights: lr.rights
            });
        },

        _find: function (id) {
            var i = 0,
                row,
                result = {};
            this.state.all.map(function (row, i) {
                if (row.__uid === id) {
                    result = row;
                    return false;
                }
            });
            return result;
        },

        _getLeftRightfromDatasource: function () {
            var lefts = [];
            var rights = [];

            this.state.all.map(function (row) {
                if (row.selected) {
                    rights.push(row);
                } else {
                    lefts.push(row);
                }
            });
            return {
                lefts: lefts,
                rights: rights
            };
        },

        handleSelect: function (id) {
            this._find(id).selected = 1;
            this.setState(this._getLeftRightfromDatasource());
        },

        handleUnselect: function (id) {
            this._find(id).selected = 0;
            this.setState(this._getLeftRightfromDatasource());
        },

        render: function () {
            var lefts = this.state.lefts.map(function (row, i) {
                return <li key={i} onClick={this.handleSelect.bind(this, row.__uid)}>{row.text}</li>;
            }.bind(this));
            var rights = this.state.rights.map(function (row, i) {
                return <li key={i} onClick={this.handleUnselect.bind(this, row.__uid)}>{row.text}</li>;
            }.bind(this));

            return (
                <div>
                    <ul>
                        {lefts}
                    </ul>
                    <ul>
                        {rights}
                    </ul>
                </div>
            );
        }
    });

    return MultiSelectList;
});