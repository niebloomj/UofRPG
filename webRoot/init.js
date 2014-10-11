var stage, output, holder;
var startContainer, menuContainer, loginContainer, registerContainer, gameContainer;
var AccountsTable = Parse.Object.extend("Accounts");
Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV",
	"XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");
var accountsTable = new AccountsTable();

function init() {
	//Create the Stage
	stage = new createjs.Stage("demoCanvas");
	startContainer = new createjs.Container();
	menuContainer = new createjs.Container();
	loginContainer = new createjs.Container();
	registerContainer = new createjs.Container();

	//createjs.Touch.enabled(stage); // just for fun to see what happens
	stage.enableMouseOver();

	/*
	 * Setup start container
	 */
	var playShape = new createjs.Shape();
	playShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);

	var playButton = new createjs.Container();
	playButton.name = "playButton";
	playButton.x = 400;
	playButton.y = 100;

	var playLabel = new createjs.Text("Play", "bold 50px Arial", "#FFFFFF");
	playLabel.name = "playLabel";
	playLabel.x = 100;
	playLabel.y = 45;
	playLabel.textAlign = "center";
	playLabel.textBaseline = "middle";

	playButton.addChild(playShape, playLabel);

	playButton.on("mouseover", function(evt) {
		console.log("Play Button Mouseover");
		playShape.graphics.beginFill("yellow").drawRoundRect(-25, -10, 250, 100, 10);
		playLabel.color = "#000000"
		playButton.addChild(playShape, playLabel);
		stage.update();
	});
	playButton.on("mouseout", function(evt) {
		playShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
		playLabel.color = "#FFFFFF";
		playButton.addChild(playShape, playLabel);
		stage.update();
	});
	playButton.on("click", handleClick, true);

	startContainer.addChild(playButton);
	stage.addChild(startContainer);
	stage.update();

	/*
	 * Setup Main Menu container
	 */
	// * Setup Login Button
	var loginShapes = new createjs.Shape();
	loginShapes.name = "background";

	var loginLabel = new createjs.Text("Login", "bold 50px Arial", "#FFFFFF");
	loginLabel.name = "loginLabel";
	loginLabel.x = 100;
	loginLabel.y = 45;
	loginLabel.textAlign = "center";
	loginLabel.textBaseline = "middle";

	var login = new createjs.Container();
	login.name = "loginButton";
	login.x = 400;
	login.y = 50;
	login.addChild(loginShapes, loginLabel);
	login.on("click", handleClick, true);
	loginShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);

	login.on("mouseover", function(evt) {
		console.log("Login Button Mouseover");
		loginShapes.graphics.beginFill("yellow").drawRoundRect(-25, -10, 250, 100, 10);
		loginLabel.color = "#000000";
		login.addChild(loginShapes, loginLabel);
		stage.update();
	});
	login.on("mouseout", function(evt) {
		loginShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
		loginLabel.color = "#FFFFFF";
		login.addChild(loginShapes, loginLabel);
		stage.update();
	});
	menuContainer.addChild(login, output);
	// * Setup Register Button
	var regShapes = new createjs.Shape();
	regShapes.name = "regShapes";

	var registerLabel = new createjs.Text("Register", "bold 50px Arial", "#FFFFFF");
	registerLabel.name = "registerLabel";
	registerLabel.x = 100;
	registerLabel.y = 45;
	registerLabel.textAlign = "center";
	registerLabel.textBaseline = "middle";

	var register = new createjs.Container();
	register.name = "registerButton";
	register.x = 400;
	register.y = 200;
	register.addChild(regShapes, registerLabel);
	menuContainer.addChild(register, output);
	register.on("click", handleClick, true);
	regShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);

	register.on("mouseover", function(evt) {
		console.log("Register Button Mouseover");
		regShapes.graphics.beginFill("yellow").drawRoundRect(-25, -10, 250, 100, 10);
		registerLabel.color = "#000000";
		register.addChild(regShapes, registerLabel);
		stage.update();
	});
	register.on("mouseout", function(evt) {
		regShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
		registerLabel.color = "#FFFFFF";
		register.addChild(regShapes, registerLabel);
		stage.update();
	});
	menuContainer.addChild(register, output);
	stage.update();

	/*
	 * Setup login container
	 */
	var logUsernameLabel = new createjs.Text("Username:", "bold 40px Arial", "#000000"); //DC143C
	logUsernameLabel.name = "logUsernameLabel";
	logUsernameLabel.x = 225;
	logUsernameLabel.y = 55;
	logUsernameLabel.textAlign = "center";
	logUsernameLabel.textBaseline = "middle";

	var logPasswordLabel = new createjs.Text("Password:", "bold 40px Arial", "#000000"); //DC143C
	logPasswordLabel.name = "logPasswordLabel";
	logPasswordLabel.x = 225;
	logPasswordLabel.y = 175;
	logPasswordLabel.textAlign = "center";
	logPasswordLabel.textBaseline = "middle";

	loginContainer.addChild(logUsernameLabel);
	loginContainer.addChild(logPasswordLabel);

	var logSubmitShape = new createjs.Shape();
	logSubmitShape.name = "logSubmitShape";

	var logSubmitLabel = new createjs.Text("Submit", "bold 50px Arial", "#FFFFFF");
	logSubmitLabel.name = "logSubmitLabel";
	logSubmitLabel.x = 85;
	logSubmitLabel.y = 45;
	logSubmitLabel.textAlign = "center";
	logSubmitLabel.textBaseline = "middle";

	var logSubmitButton = new createjs.Container();
	logSubmitButton.name = "logSubmitButton";
	logSubmitButton.x = 400;
	logSubmitButton.y = 225;
	logSubmitButton.addChild(logSubmitShape, logSubmitLabel);
	loginContainer.addChild(register, output);
	logSubmitButton.on("click", handleClick, true); //doRegister, true);

	logSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);

	logSubmitButton.on("mouseover", function(evt) {
		logSubmitShape.graphics.beginFill("yellow").drawRoundRect(-25, -10, 225, 100, 10);
		logSubmitLabel.color = "#000000";
		logSubmitButton.addChild(logSubmitShape, logSubmitLabel);
		stage.update();
	});
	logSubmitButton.on("mouseout", function(evt) {
		logSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);
		logSubmitLabel.color = "#FFFFFF";
		logSubmitButton.addChild(logSubmitShape, logSubmitLabel);
		stage.update();
	});
	loginContainer.addChild(logSubmitButton);

	/*
	 * Setup register container
	 */
	var regUsernameLabel = new createjs.Text("Username:", "bold 40px Arial", "#000000"); //DC143C
	regUsernameLabel.name = "registerLabel";
	regUsernameLabel.x = 225;
	regUsernameLabel.y = 55;
	regUsernameLabel.textAlign = "center";
	regUsernameLabel.textBaseline = "middle";

	var regPasswordLabel = new createjs.Text("Password:", "bold 40px Arial", "#000000"); //DC143C
	regPasswordLabel.name = "registerLabel";
	regPasswordLabel.x = 225;
	regPasswordLabel.y = 175;
	regPasswordLabel.textAlign = "center";
	regPasswordLabel.textBaseline = "middle";

	registerContainer.addChild(regUsernameLabel);
	registerContainer.addChild(regPasswordLabel);

	var regSubmitShape = new createjs.Shape();
	regSubmitShape.name = "regSubmitShape";

	var regSubmitLabel = new createjs.Text("Submit", "bold 50px Arial", "#FFFFFF");
	regSubmitLabel.name = "regSubmitLabel";
	regSubmitLabel.x = 85;
	regSubmitLabel.y = 45;
	regSubmitLabel.textAlign = "center";
	regSubmitLabel.textBaseline = "middle";

	var regSubmitButton = new createjs.Container();
	regSubmitButton.name = "regSubmitButton";
	regSubmitButton.x = 400;
	regSubmitButton.y = 225;
	regSubmitButton.addChild(regSubmitShape, regSubmitLabel);
	menuContainer.addChild(register, output);
	regSubmitButton.on("click", handleClick, true); //doRegister, true);

	regSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);

	regSubmitButton.on("mouseover", function(evt) {
		regSubmitShape.graphics.beginFill("yellow").drawRoundRect(-25, -10, 225, 100, 10);
		regSubmitLabel.color = "#000000";
		regSubmitButton.addChild(regSubmitShape, regSubmitLabel);
		stage.update();
	});
	regSubmitButton.on("mouseout", function(evt) {
		regSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);
		regSubmitLabel.color = "#FFFFFF";
		regSubmitButton.addChild(regSubmitShape, regSubmitLabel);
		stage.update();
	});
	registerContainer.addChild(regSubmitButton);

	stage.update();
}

function handleClick(event) {
	if (event.currentTarget.name == "playButton") {
		stage.removeChild(startContainer);
		stage.addChild(menuContainer);
		stage.update();
	} else if (event.currentTarget.name == "registerButton") {
		stage.removeChild(menuContainer);
		stage.addChild(registerContainer);

		var usernameField = document.createElement("input");
		usernameField.setAttribute("id", "username");
		usernameField.maxLength = 12;
		usernameField.style.width = '200px';
		usernameField.style.height = '3em';
		usernameField.placeholder = "Username";
		usernameField.autofocus = true;

		var passwordField = document.createElement("input");
		passwordField.setAttribute("id", "password");
		passwordField.type = "password";
		passwordField.maxLength = 12;
		passwordField.style.width = '200px';
		passwordField.style.height = '3em';
		passwordField.style.top = "-350px";
		passwordField.placeholder = "Password";

		var gameDom = new createjs.DOMElement("gameDom");
		gameDom.htmlElement.appendChild(usernameField);
		gameDom.htmlElement.appendChild(passwordField);

		stage.update();
	} else if (event.currentTarget.name == "loginButton") {
		stage.removeChild(menuContainer);
		stage.addChild(loginContainer);

		var usernameField = document.createElement("input");
		usernameField.setAttribute("id", "username");
		usernameField.maxLength = 12;
		usernameField.style.width = '200px';
		usernameField.style.height = '3em';
		usernameField.placeholder = "Username";
		usernameField.autofocus = true;

		var passwordField = document.createElement("input");
		passwordField.setAttribute("id", "password");
		passwordField.type = "password";
		passwordField.maxLength = 12;
		passwordField.style.width = '200px';
		passwordField.style.height = '3em';
		passwordField.style.top = "-350px";
		passwordField.placeholder = "Password";

		var gameDom = new createjs.DOMElement("gameDom");
		gameDom.htmlElement.appendChild(usernameField);
		gameDom.htmlElement.appendChild(passwordField);

		stage.update();
	} else if (event.currentTarget.name == "regSubmitButton") {
		var query = new Parse.Query(AccountsTable);
		query.equalTo("Username", document.getElementById("username").value);
		query.find({
			success: function(results) {
				if (results.length == 0) {
					accountsTable.save({
						Username: document.getElementById("username").value,
						Password: document.getElementById("password").value
					});
					stage.removeChild(registerContainer);
					alert("Account Created");
					loginSuccessful();
				} else {
					document.getElementById("username").value = ""
					document.getElementById("password").value = ""
					alert("Username already exists.");
				}
			},
			error: function(error) {
				alert(error.message);
			}
		});
	} else if (event.currentTarget.name == "logSubmitButton") {
		var query = new Parse.Query(AccountsTable);
		query.equalTo("Username", document.getElementById("username").value);
		query.find({
			success: function(results) {
				if (results.length == 1) {
					query.equalTo("Password", document.getElementById("password").value);
					query.find({
						success: function(results) {
							if (results.length == 1) {
								document.getElementById("username").value = "";
								document.getElementById("password").value = "";
								loginSuccessful();
							} else {
								document.getElementById("password").value = "";
								alert("That password does not match.");
							}
						},
						error: function(error) {
							alert(error.message);
						}
					});
				} else {
					document.getElementById("username").value = "";
					document.getElementById("password").value = "";
					alert("That Username does not exists.");
				}
			},
			error: function(error) {
				alert(error.message);
			}
		});
	} else if (event.currentTarget.name == "startButton") {
		stage.removeChild(menuContainer);
		stage.update();
	}
}

function loginSuccessful() {
	document.getElementById("username").remove();
	document.getElementById("password").remove();
	stage.removeChild(loginContainer);
	stage.update();

	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);

	var label = new createjs.Text("Drag it!!", "bold 14px Arial", "#FFFFFF");
	label.textAlign = "center";
	label.y = -7;

	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.addChild(circle, label);
	gameContainer.addChild(dragger);

	dragger.on("pressmove", function(evt) {
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();
	});

	stage.addChild(gameContainer);
	stage.update();
}
