define([
    "jquery",
    "backbone",
    "react",
    "lib/ui/Example.react.js",
    "css!styles/group"
], function ($, Backbone, React, Example) {
    "use strict";

    var Page = React.createClass({
        getDefaultProps: function () {
            return {
                name: 'acelan',
                value: 1
            };
        },
        componentDidMount: function () {
            this.setProps({
                name: "abc",
                value: 2
            });
        },
        _changeExample: function () {
            this.setProps({
                name: "efg",
                value: 3
            });
        },
        render: function () {
            return (
                <div>
                    <a href="#home/index/a:1/b:222">return home</a>
                    <div onClick={this._changeExample}>change example</div>
                    <Example name={this.props.name} value={this.props.value} />
                </div>
            );
        }
    });


    return function (params) {
        React.render(
            <Page/>,
            $("#Main").get(0)
        );
    }
});