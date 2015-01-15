define(["jquery", "react"], function ($, React) {
    "use strict";

    var UINav = React.createClass({
        componentDidMount: function() {
            this.props.items.on('add', $.proxy(function() {
                this.forceUpdate();
            }, this));
            this.props.items.on('remove', $.proxy(function() {
                this.forceUpdate();
            }, this));
        },
        render: function () {
            var items = this.props.items.map($.proxy(function (item, i) {
                return (
                    <li key={i}>
                        {item.get('name')}
                        <span className="remove-btn" onClick={$.proxy(this.props.onremove, this, item.cid)}>x</span>
                    </li> 
                );  
            }, this));
            return (
                <div>
                    <span onClick={this.props.onadd}>add</span>
                    <ul>
                        {items}
                    </ul>
                </div>
            );
        }
    });

    return UINav;
});