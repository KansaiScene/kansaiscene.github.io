// User Model - user.js
var AmpModel = require('ampersand-model')
  , root = require('../root')


module.exports = AmpModel.extend({
	urlRoot: root + '/user',
	props: {
    	email: 'string',
   		application_token: 'string',
   		loggedIn: ['boolean', false]
	},
	parse: function (obj) {
		if (obj.error ) {
			return {
				loggedIn: false
			};
		}
		obj = obj.data;
		obj.loggedIn = true;
		return obj;
	}
});