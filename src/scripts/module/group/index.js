define([
    "jquery",
    "backbone",
    "react",
    "lib/ui/Example.react.js",
    "css!styles/group"
], function ($, Backbone, React, Example) {
    "use strict";

    var View = React.createClass({
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
        changeExample: function () {
            this.setProps({
                name: "efg",
                value: 3
            });
        },
        submit: function () {
            window.location.href = "#home/index";
        },
        render: function () {
            return (
                <div>
                    <a href="#home/index/a:1/b:222">return home</a>
                    <div>接收的参数为 {JSON.stringify(this.props.req)} </div>
                    <form onSubmit={this.submit}>
                        <div onClick={this.changeExample}>change example</div>
                        <Example name={this.props.name} value={this.props.value} />
                        <input type="submit" value="提交"/>
                    </form>
                </div>
            );
        }
    });


    return function (params) {
        React.render(
            <View req={params}/>,
            $("#Main").get(0)
        );
    }
});