var View = require('ampersand-view')
  , trim = require('amp-trim')
  , EMAIL_REG = require("../util/emailReg")
  , request = require('../util/request');


module.exports = View.extend({
	template: function () {
    	return document.getElementById('user-register')
    },
    props: {
    	email: ["string", true],
    	password: ["password", true],
    	password2: ["password2", true],
    	submitting: ["boolean", true, false],
        agreed: ["boolean", true, false],
    	error: "string"
    },
    autoRender: true,
    events: {
    	'submit': 'doRegister',
    	'click .cancel': 'doCancel',
    	'input .email': 'updateLogin',
        'change .agreed': 'updateAgreed',
    	'input .password': 'updatePassword',
    	'input .password2': 'updatePassword2'
    },
    bindings: {
    	'email': {
    		type: 'value',
    		selector: '.email'
    	},
    	'password': {
    		type: 'value',
    		selector: '.password'
    	},
    	'password2': {
    		type: 'value',
    		selector: '.password2'
    	},
        'agreed': {
            type: 'booleanAttribute',
            selector: '.agreed',
            name: 'checked'
        },
    	'submitting': {
    		type: 'booleanClass',
    		name: 'submitting'
    	},
    	'error': {
    		type: 'switch',
    		cases: {
    			'unspecified': '.error-unspecified',
    			'request': '.error-request',
    			'responseJson': '.error-responseJson',
    			'email': '.error-email',
    			'password': '.error-password',
    			'passwordNoMatch': '.error-passwordNoMatch',
    			'userExists': '.error-userExists',
                'notAgreed': '.error-notAgreed'
    		}
    	}
    },
    updateLogin: function (e) {
    	this.email = e.target.value;
    },
  	updatePassword: function (e) {
  		this.password = e.target.value;
  	},
  	updatePassword2: function (e) {
  		this.password2 = e.target.value;
  	},
    updateAgreed: function (e) {
        this.agreed = e.target.checked;
    },
  	doCancel: function() {
  		this.trigger('cancel');
  	},
    doRegister: function(e) {
    	e.preventDefault();
    	var email = trim(this.email || ""),
    	    password = trim(this.password || ""),
    	    password2 = trim(this.password2 || "");
    	if (!EMAIL_REG.test(email)) {
    		this.error = 'email';
    		return;
    	}
    	if (password.length < 8) {
    		this.error = 'password';
    		return;
    	}
    	if (password !== password2) {
    		this.error = 'passwordNoMatch';
    		return;
    	}
        if (!this.agreed) {
            this.error = 'notAgreed';
            return;
        }
    	this.error = null;
    	this.submitting = true;
    	request({
    		path: 'register',
            post: {
	    		email: email,
	    		password: password
	    	}
    	}, (function (basicError, error, data) {
    		this.submitting = false;
    		if (basicError) {
    			this.error = basicError;
    		} else if (error === "user exists") {
    			this.error = "userExists";
    		} else if (error) {
    			this.error = "unspecified";
    		} else {
    			this.trigger("signed-up");
    		}
    	}).bind(this))
    }
});