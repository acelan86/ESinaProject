define([
    "scripts/AppDispatcher",
    "scripts/stores/ExampleStore",
    "react",
    "lib/components/Example.react"
], function (
    dispatcher,
    store,
    React,
    Example
) {
    "use strict";

    var View = React.createClass({
        componentDidMount: function () {
            store.on('change', this.storeChange);
        },
        componentWillUnmount: function() {  
            store.off('change', this.storeChange);
        },
        storeChange: function () {
            this.forceUpdate();
        },
        changeExample: function () {
            //触发某个dispatcher的action
            dispatcher.trigger('change-example', "lanxiaobin", 2);
        },
        render: function () {
            var data = store.get();
            return (
                <div>
                    <input type="button" value="change" onClick={this.changeExample}/>
                    <Example name={data.name} value={data.value}/>
                </div>
            );
        }
    })

    return function () {
        React.render(
            <View />,
            document.getElementById("Main")
        )
    } 
});