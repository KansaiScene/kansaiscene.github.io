var View = require('ampersand-view')
  , request = require('../util/request')
  , User = require('../models/user');


module.exports = View.extend({
    template: function () {
    	return document.getElementById('user-data')
    },
    autoRender: true,
    props: {
    	user: 'object',
    	submitting: ['boolean', true, false]
    },
    children: {
        user: User
    },
    events: {
    	'click .logout': 'doLogout',
    	'click .refresh': 'doRefresh'
    },
    bindings: {
    	'user.email': {
    		type: 'text',
        	hook: 'email'
    	},
    	'user.application_token': {
    		type: 'text',
        	hook: 'token'
    	}
    },
    doRefresh: function () {
    	this.submitting = true;
    	request({
    		path: 'user/new-key'
    	}, (function (basicError, error, data) {
    		this.submitting = false;
    		if (basicError) {
    			this.error = basicError;
    		} else if (error || !data) {
    			this.error = "unspecified";
    		} else {
    			this.trigger("new-key", data);	
    		}
    	}).bind(this));
    },
    doLogout: function () {
    	this.submitting = true;
    	this.error = null;
    	request({
    		path: 'logout'
    	}, (function (basicError, error, data) {
    		this.submitting = false;
    		if (basicError) {
    			this.error = basicError;
    		} else if (error) {
    			this.error = "unspecified"
    		} else {
    			this.trigger("logged-out");
    		}
    	}).bind(this));
    }
});