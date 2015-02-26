var User = require("./models/user")
  , user = new User()
  , views = {
  	Login: new (require("./views/Login")),
  	Register: new (require("./views/Register")),
  	ResetPassword: new (require("./views/ResetPassword")),
  	ResetPasswordContinue: new (require("./views/ResetPasswordContinue")),
  	Data: new (require("./views/Data")),
  	screens: new (require("./views/Screen"))
  };

function loadUser(callback) {
	user.fetch({
		withCredentials: true,
		success: function () {
			views.Data.user = null;
			views.Data.user = user;
			views.Data.render();
			views.Login.message = null;
			views.screens.view = user.loggedIn ? "data" : "login";
			callback && callback();
		}
	});	
}

function sendMessage(msg) {
	return function () {
		loadUser(function() {
			views.Login.message = msg;
		});
	};
}

var sendSuccess = sendMessage("send-success");

function changeScreen(screen) {
	return function () {
		views.screens.view = screen;
	}
}

views.Login
	.on('register', changeScreen("register"))
	.on('reset', changeScreen("password-reset"))
	.on('logged-in', loadUser);

views.Register
	.on('cancel', loadUser)
	.on('signed-up', sendMessage("signed-up"))

views.Data
	.on('logged-out', function () {
		user.email = null;
		user.application_token = null;
		views.Login.email = "";
		views.Login.password = "";
		views.screens.view = 'login';
	})
	.on('new-key', function (data) {
		user.application_token = data.application_token;
		views.Data.user = null;
		views.Data.user = user;
	})

views.ResetPassword
	.on('cancel', loadUser)
	.on('sent', sendMessage("reset-request-sent"))

views.ResetPasswordContinue
	.on('cancel', loadUser)
	.on('sent', sendMessage("successfully-reset"))

var confirmData = /\#confirm\?token=([0-9A-Za-z]{40})\&email=([^&]*)/.exec(document.location.hash);
if (confirmData) {
	document.location.hash = "";
	views.ResetPasswordContinue.token = confirmData[1];
	views.ResetPasswordContinue.email = confirmData[2];
	views.screens.view = 'password-reset-continue';
} else {
	loadUser(function () {
		if (document.location.hash === "#activated") {
			document.location.hash = "";
			views.Login.message = "activated";
		}
	});	
}