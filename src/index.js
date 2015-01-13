require(["jquery", "react", "backbone", "js/inner"], function ($, React, Backbone, inner) {
	console.log(Backbone);
    
    React.render(
        <div>hello world!!</div>,
        document.body
    );
});