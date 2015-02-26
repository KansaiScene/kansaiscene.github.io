var View = require('ampersand-view');


module.exports = View.extend({
    template: function () {
        var el = document.getElementById('user-content');
        el.style.display = "block"
    	return el;
    },
    autoRender: true,
    props: {
    	view: ["string", true, "none"]
    },
    bindings: {
    	"view": {
    		type: 'switch',
    		cases: {
    			"login": "#user-login",
        		"register": "#user-register",
        		"password-reset": "#user-password-reset",
                "password-reset-continue": "#user-password-reset-continue",
        		"data": "#user-data"
        	}
    	}
    }
});