var View = require('ampersand-view')
  , trim = require('amp-trim')
  , request = require('../util/request')
  , EMAIL_REG = require('../util/emailReg');


module.exports = View.extend({
    template: function () {
    	return document.getElementById('user-login')
    },
    props: {
    	email: ["string", true],
    	password: ["password", true],
    	submitting: ["boolean", true, false],
        message: "string",
    	error: "string"
    },
    autoRender: true,
    events: {
        'submit': 'doLogin',
    	'click .register': 'doRegister',
    	'click .reset': 'doReset',
    	'input .email': 'updateLogin',
    	'input .password': 'updatePassword'
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
    	'submitting': {
    		type: 'booleanClass',
    		name: 'submitting',
            cases: {
                'reset-sent': '.message .reset-failed',
                'responseJson': '.error-responseJson',
                'email': '.error-email',
                'password': '.error-password'
            }
    	},
        'message': [{
            type: 'switch',
            cases: {
                'activated': '.messages .activated',
                'send-success': '.messages .send-success',
                'signed-up': '.messages .signed-up',
                'reset-request-sent': '.messages .reset-request-sent',
                'successfully-reset': '.messages .successfully-reset',
            }
        }],
    	'error': {
    		type: 'switch',
    		cases: {
    			'credentials': '.error-credentials',
    			'request': '.error-request',
    			'responseJson': '.error-responseJson',
    			'email': '.error-email',
    			'password': '.error-password'
    		}
    	}
    },
    updateLogin: function (e) {
    	this.email = e.target.value;
    },
  	updatePassword: function (e) {
  		this.password = e.target.value;
  	},
  	doRegister: function() {
  		this.trigger('register');
  	},
  	doReset: function() {
  		this.trigger('reset');
  	},
    doLogin: function(e) {
        e.preventDefault();
    	var email = trim(this.email || ""),
    	    password = trim(this.password || "");
    	if (!EMAIL_REG.test(email)) {
    		this.error = 'email';
    		return;
    	}
    	if (password.length < 8) {
    		this.error = 'password';
    		return;
    	}
    	this.error = null;
    	this.submitting = true;
    	request({
    		path: 'login',
    		post: {
	    		email: email,
	    		password: password
	    	}
    	}, (function (basicError, error, data) {
    		this.submitting = false;
            if (basicError) {
                this.error = basicError;
            } else if (error) {
                this.error = "credentials";
            } else {
                this.trigger("logged-in");
            }
    	}).bind(this));
        return false;
    }
});