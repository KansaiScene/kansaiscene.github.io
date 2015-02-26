var View = require('ampersand-view')
  , request = require('../util/request');


module.exports = View.extend({
	template: function () {
		return document.getElementById('user-password-reset');
	},
	autoRender: true,
	props: {
		email: 'string',
		error: 'string',
		submitting: ["boolean", true, false]
	},
	bindings: {
		'error': {
			type: 'switch',
			cases: {
				'unspecified': '.error-unspecified',
    			'email': '.error-email',
				'request': '.error-request',
				'responseJson': '.error-responseJson',
			}
		}
	},
	events: {
		'submit': 'doReset',
		'click .cancel': 'doCancel',
		'input .email': 'updateLogin'
	},
	updateLogin: function (e) {
		this.email = e.target.value;
	},
	doCancel: function() {
		this.trigger('cancel');
	},
	doReset: function(e) {
		e.preventDefault();
		this.error = null;
		this.submitting = true;
		request({
			path: 'reset-password',
			post: {
				email: this.email
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