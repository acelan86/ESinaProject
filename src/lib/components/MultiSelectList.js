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
                lefts: [],
                rights: []
            };
        },
        //首次挂载时调用
        componentWillMount: function () {
            this.props.datasource.map(function (row, i) {
                row.__uid = i;
            });
            this.setState(this._getLeftRightfromDatasource());
        },
        //当再次接收到属性变化时调用
        //this.props里面存储的为旧属性
        //newProps中为新属性
        componentWillReceiveProps: function (newProps) {
            newProps.datasource.map(function (row, i) {
                row.__uid = i;
            });
            this.setState(this._getLeftRightfromDatasource());
        },

        _find: function (id) {
            var i = 0,
                row,
                result = {};
            this.props.datasource.map(function (row, i) {
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

            this.props.datasource.map(function (row) {
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