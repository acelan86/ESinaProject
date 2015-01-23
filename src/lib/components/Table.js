define(["react"], function (React) {
    "use strict";

    var Table = React.createClass({
        getDefaultProps: function () {
            return {
                datasource: [],
                fields: []
            };
        },
        render: function () {
            var fields = this.props.fields;

            //创建行内容
            var rows = this.props.datasource.map(function (row, i) {
                var tds = fields.map(function (field, j) {
                    return <td key={j}>{row[field.field] || '-'}</td>;
                });
                return <tr key={i}>{tds}</tr>;
            });

            //创建表头
            var ths = fields.map(function (field, i) {
                return <th key={i}>{field.name}</th>;
            });

            return (
                <table>
                    <tr>{ths}</tr>
                    {rows}
                </table>
            );
        }
    });

    return Table;
});