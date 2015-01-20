define(["jquery", "react"], function ($, React) {
    "use strict";

    var Example = React.createClass({
        render: function () {
            return (
                <span>{this.props.name} : {this.props.value}</span>
            );
        }
    });

    return Example;
});