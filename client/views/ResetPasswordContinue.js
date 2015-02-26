var View = require('ampersand-view')
  , trim = require('amp-trim')
  , EMAIL_REG = require("../util/emailReg")
  , request = require('../util/request');


module.exports = View.extend({
	template: function () {
		return document.getElementById('user-password-reset-continue');
	},
	autoRender: true,
	props: {
		token: 'string',
		email: 'string',
		password: 'string',
		password2: 'string',
		error: 'string',
		submitting: ["boolean", true, false]
	},
	events: {
		'submit': 'doReset',
		'click .cancel': 'doCancel',
		'input .email': 'updateLogin',
		'input .token': 'updateToken',
		'input .password': 'updatePassword',
		'input .password2': 'updatePassword2'
	},
	bindings: {
		'email': {
			type: 'value',
			selector: '.email'
		},
		'token': {
			type: 'value',
			selector: '.token'
		},
		'password': {
			type: 'value',
			selector: '.password'
		},
		'password2': {
			type: 'value',
			selector: '.password2'
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
				'noToken': '.error-noToken'
			}
		}
	},
	updateToken: function (e) {
		this.token = e.target.value;
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
	doCancel: function() {
		this.trigger('cancel');
	},
	doReset: function(e) {
		e.preventDefault();
		var email = trim(this.email || ""),
    	    password = trim(this.password || ""),
    	    password2 = trim(this.password2 || ""),
    	    token = trim(this.token || "");
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
    	if (token === "") {
    		this.error = 'noToken';
    		return;
    	}
    	this.error = null;
    	this.submitting = true;
		request({
			path: 'reset-password/' + this.token,
			post: {
				email: email,
				password: password
			}
		}, (function (basicError, error, data) {
			this.submitting = false;
			if (basicError) {
				this.error = basicError;
			} else if (error) {
				this.error = "unspecified";
			} else {
				this.trigger('sent');
			}
		}).bind(this))
	}
});