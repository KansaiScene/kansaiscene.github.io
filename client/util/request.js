var xhr = require('xhr')
  , qs = require('qs')
  , root = require('../root')

module.exports = function (options, callback) {
	xhr({
		uri: root + options.path,
		method: 'post',
        withCredentials: true,
        headers: {
        	"Content-Type": "application/x-www-form-urlencoded"
        },
		body: options.post ? qs.stringify(options.post) : undefined
	}, function (scope, req, data) {
		if (data) {
			try {
				data = JSON.parse(data);
			} catch(e) {
				return callback('requestJson');
			}
		} else {
			return callback('request');
		}
		if (data.error) {
			return callback(null, data.error);
		}
		callback(null, null, data.data || (data.success && data));
    })
}