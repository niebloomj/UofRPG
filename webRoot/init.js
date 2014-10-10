var stage, output, holder;
var startContainer, menuContainer, loginContainer, registerContainer, gameContainer;
//Parse Accounts Table Creation
var AccountsTable = Parse.Object.extend("Accounts");

function init() {
	//Create the Stage
	stage = new createjs.Stage("demoCanvas");
	startContainer = new createjs.Container();
	menuContainer = new createjs.Container();
	loginContainer = new createjs.Container();
<<<<<<< HEAD
    registerContainer = new createjs.Container();
    gameContainer = new createjs.Container();

    //createjs.Touch.enabled(stage); // just for fun to see what happens
    stage.enableMouseOver();

    /*
     * Setup start container
     */
    //var img = new Image(1,1);
    //img.src = "img/playbutton.png";
    //var bitmap = new createjs.Bitmap(img);

    var playShape = new createjs.Shape();
    playShape.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);

    var playButton = new createjs.Container();
    playButton.name = "playButton";
    playButton.x = 400;
    playButton.y = 100;
    //playButton.addChild(bitmap);

    var playLabel = new createjs.Text("Play", "bold 50px Arial", "#FFFFFF");
    playLabel.name = "playLabel";
    playLabel.x = 100;
    playLabel.y = 45;
    playLabel.textAlign = "center";
    playLabel.textBaseline = "middle";

    playButton.addChild(playShape, playLabel);

    playButton.on("mouseover", function(evt) {
        console.log("Play Button Mouseover");
        playShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
        /*img.src = "img/playbutton_hover.png";
            bitmap = new createjs.Bitmap(img);
            playButton.addChild(bitmap);*/
        playButton.addChild(playShape, playLabel);
        stage.update();
    });
    playButton.on("mouseout", function(evt) {
        playShape.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);
        /*img.src = "img/playbutton.png";
            bitmap = new createjs.Bitmap(img);
            playButton.addChild(bitmap);*/
        playButton.addChild(playShape, playLabel);
        stage.update();
    });

    playButton.on("click", handleClick, true);

    startContainer.addChild(playButton);
    stage.addChild(startContainer);
    stage.update();

    /*
     * Setup main menu container
     */
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
    menuContainer.addChild(login, output);
    login.on("click", handleClick, true);

    loginShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);

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
    register.on("click", handleClick, true); //doRegister, true);

    regShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);

    login.on("mouseover", function(evt) {
        console.log("Login Button Mouseover");
        loginShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
        login.addChild(loginShapes, loginLabel);
        stage.update();
    });
    login.on("mouseout", function(evt) {
        loginShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);
        login.addChild(loginShapes, loginLabel);
        stage.update();
    });

    register.on("mouseover", function(evt) {
        console.log("Register Button Mouseover");
        regShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
        register.addChild(regShapes, registerLabel);
        stage.update();
    });
    register.on("mouseout", function(evt) {
        regShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);
        register.addChild(regShapes, registerLabel);
        stage.update();
    });
    stage.update();
	
=======
	registerContainer = new createjs.Container();
	gameContainer = new createjs.Container();

	//createjs.Touch.enabled(stage); // just for fun to see what happens
	stage.enableMouseOver();

	/*
	 * Setup start container
	 */
	//var img = new Image(1,1);
	//img.src = "img/playbutton.png";
	//var bitmap = new createjs.Bitmap(img);

	var playShape = new createjs.Shape();
	playShape.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);

	var playButton = new createjs.Container();
	playButton.name = "playButton";
	playButton.x = 400;
	playButton.y = 100;
	//playButton.addChild(bitmap);

	var playLabel = new createjs.Text("Play", "bold 50px Arial", "#FFFFFF");
	playLabel.name = "playLabel";
	playLabel.x = 100;
	playLabel.y = 45;
	playLabel.textAlign = "center";
	playLabel.textBaseline = "middle";

	playButton.addChild(playShape, playLabel);

	playButton.on("mouseover", function(evt) {
		console.log("Play Button Mouseover");
		playShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
		/*img.src = "img/playbutton_hover.png";
		    bitmap = new createjs.Bitmap(img);
		    playButton.addChild(bitmap);*/
		playButton.addChild(playShape, playLabel);
		stage.update();
	});
	playButton.on("mouseout", function(evt) {
		playShape.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);
		/*img.src = "img/playbutton.png";
		    bitmap = new createjs.Bitmap(img);
		    playButton.addChild(bitmap);*/
		playButton.addChild(playShape, playLabel);
		stage.update();
	});

	playButton.on("click", handleClick, true);

	startContainer.addChild(playButton);
	stage.addChild(startContainer);
	stage.update();

	/*
	 * Setup main menu container
	 */
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
	menuContainer.addChild(login, output);
	login.on("click", doLogin, true);

	loginShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);

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
	register.on("click", handleClick, true); //doRegister, true);

	regShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);

	login.on("mouseover", function(evt) {
		console.log("Login Button Mouseover");
		loginShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
		login.addChild(loginShapes, loginLabel);
		stage.update();
	});
	login.on("mouseout", function(evt) {
		loginShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);
		login.addChild(loginShapes, loginLabel);
		stage.update();
	});

	register.on("mouseover", function(evt) {
		console.log("Register Button Mouseover");
		regShapes.graphics.beginFill("blue").drawRoundRect(-25, -10, 250, 100, 10);
		register.addChild(regShapes, registerLabel);
		stage.update();
	});
	register.on("mouseout", function(evt) {
		regShapes.graphics.beginFill("red").drawRoundRect(-25, -10, 250, 100, 10);
		register.addChild(regShapes, registerLabel);
		stage.update();
	});
	stage.update();

>>>>>>> origin/master
	/*
	 * Setup login container
	 */
	var logUsernameLabel = new createjs.Text("Username:", "bold 40px Arial", "#000000"); //DC143C
<<<<<<< HEAD
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

    logSubmitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);

    logSubmitButton.on("mouseover", function(evt) {
        logSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);
        logSubmitButton.addChild(logSubmitShape, logSubmitLabel);
        stage.update();
    });
    logSubmitButton.on("mouseout", function(evt) {
        logSubmitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);
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

    regSubmitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);

    regSubmitButton.on("mouseover", function(evt) {
        regSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);
        regSubmitButton.addChild(regSubmitShape, regSubmitLabel);
        stage.update();
    });
    regSubmitButton.on("mouseout", function(evt) {
        regSubmitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);
        regSubmitButton.addChild(regSubmitShape, regSubmitLabel);
        stage.update();
    });
    registerContainer.addChild(regSubmitButton);

    /*
     * Setup game container (main container holding the game itself)
     */
    var tempLabel = new createjs.Text("This is the container we should use to hold the game.", "bold 20px Arial", "#000000");
    tempLabel.name = "registerLabel";
    tempLabel.x = 275;
    tempLabel.y = 45;
    tempLabel.textAlign = "center";
    tempLabel.textBaseline = "middle";

    gameContainer.addChild(tempLabel);

    stage.update();
}

function handleClick(event) {
    if (event.currentTarget.name == "playButton") {
        stage.removeChild(startContainer);
        stage.addChild(menuContainer);
    } else if (event.currentTarget.name == "registerButton") {
        stage.removeChild(menuContainer);
        stage.addChild(registerContainer);

        var usernameField = document.createElement("input");
        usernameField.setAttribute("id", "username");
        usernameField.maxLength = 10;
        usernameField.style.width = '200px';
        usernameField.style.height = '3em';
        usernameField.placeholder = "Username";
        usernameField.autofocus = true;

        var passwordField = document.createElement("input");
        passwordField.setAttribute("id", "password");
        passwordField.type = "password";
        passwordField.maxLength = 10;
        passwordField.style.width = '200px';
        passwordField.style.height = '3em';
        passwordField.style.top = "-350px";
        passwordField.placeholder = "Password";

        var gameDom = new createjs.DOMElement("gameDom");
        gameDom.htmlElement.appendChild(usernameField);
        gameDom.htmlElement.appendChild(passwordField);
	}else if (event.currentTarget.name == "loginButton"){
		stage.removeChild(menuContainer);
		stage.addChild(loginContainer);
		
		var usernameField = document.createElement("input");
        usernameField.setAttribute("id", "username");
        usernameField.maxLength = 10;
        usernameField.style.width = '200px';
        usernameField.style.height = '3em';
        usernameField.placeholder = "Username";
        usernameField.autofocus = true;

        var passwordField = document.createElement("input");
        passwordField.setAttribute("id", "password");
        passwordField.type = "password";
        passwordField.maxLength = 10;
        passwordField.style.width = '200px';
        passwordField.style.height = '3em';
        passwordField.style.top = "-350px";
        passwordField.placeholder = "Password";

        var gameDom = new createjs.DOMElement("gameDom");
        gameDom.htmlElement.appendChild(usernameField);
        gameDom.htmlElement.appendChild(passwordField);
	}else if (event.currentTarget.name == "logSubmitButton"){
		doLogin();
    } else if (event.currentTarget.name == "startButton") {
        stage.removeChild(menuContainer);
        //stage.addChild(gameContainer);
    } else if (event.currentTarget.name == "submitButton") {
        Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV",
            "XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");
        var AccountsTable = Parse.Object.extend("Accounts");
        var accountsTable = new AccountsTable();
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
                    stage.addChild(gameContainer);
                    alert("Account Created");
                } else {
                    document.getElementById("username").value = ""
                    document.getElementById("password").value = ""
                    alert("Account already exists.");
                }
            },
            error: function(error) {
                alert(error.message);
            }
        });
    }
	  stage.update();
=======
	logUsernameLabel.name = "logUserLabel";
	logUsernameLabel.x = 225;
	logUsernameLabel.y = 55;
	logUsernameLabel.textAlign = "center";
	logUsernameLabel.textBaseline = "middle";

	var logPasswordLabel = new createjs.Text("Password:", "bold 40px Arial", "#000000"); //DC143C
	logPasswordLabel.name = "logPassLabel";
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
	menuContainer.addChild(register, output);
	logSubmitButton.on("click", handleClick, true); //doRegister, true);

	logSubmitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);

	submitButton.on("mouseover", function(evt) {
		logSubmitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);
		submitButton.addChild(logSubmitShape, logSubmitLabel);
		stage.update();
	});
	submitButton.on("mouseout", function(evt) {
		logSubmitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);
		submitButton.addChild(logSubmitShape, logSubmitLabel);
		stage.update();
	});
	registerContainer.addChild(submitButton);
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

	var submitShape = new createjs.Shape();
	submitShape.name = "submitShape";

	var submitLabel = new createjs.Text("Submit", "bold 50px Arial", "#FFFFFF");
	submitLabel.name = "submitLabel";
	submitLabel.x = 85;
	submitLabel.y = 45;
	submitLabel.textAlign = "center";
	submitLabel.textBaseline = "middle";

	var submitButton = new createjs.Container();
	submitButton.name = "submitButton";
	submitButton.x = 400;
	submitButton.y = 225;
	submitButton.addChild(submitShape, submitLabel);
	menuContainer.addChild(register, output);
	submitButton.on("click", handleClick, true); //doRegister, true);

	submitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);

	submitButton.on("mouseover", function(evt) {
		submitShape.graphics.beginFill("blue").drawRoundRect(-25, -10, 225, 100, 10);
		submitButton.addChild(submitShape, submitLabel);
		stage.update();
	});
	submitButton.on("mouseout", function(evt) {
		submitShape.graphics.beginFill("red").drawRoundRect(-25, -10, 225, 100, 10);
		submitButton.addChild(submitShape, submitLabel);
		stage.update();
	});
	registerContainer.addChild(submitButton);

	/*
	 * Setup game container (main container holding the game itself)
	 */
	var tempLabel = new createjs.Text("This is the container we should use to hold the game.", "bold 20px Arial", "#000000");
	tempLabel.name = "registerLabel";
	tempLabel.x = 275;
	tempLabel.y = 45;
	tempLabel.textAlign = "center";
	tempLabel.textBaseline = "middle";

	gameContainer.addChild(tempLabel);

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
		usernameField.maxLength = 10;
		usernameField.style.width = '200px';
		usernameField.style.height = '3em';
		usernameField.placeholder = "Username";
		usernameField.autofocus = true;

		var passwordField = document.createElement("input");
		passwordField.setAttribute("id", "password");
		passwordField.type = "password";
		passwordField.maxLength = 10;
		passwordField.style.width = '200px';
		passwordField.style.height = '3em';
		passwordField.style.top = "-350px";
		passwordField.placeholder = "Password";

		var gameDom = new createjs.DOMElement("gameDom");
		gameDom.htmlElement.appendChild(usernameField);
		gameDom.htmlElement.appendChild(passwordField);

		stage.update();
	} else if (event.currentTarget.name == "startButton") {
		stage.removeChild(menuContainer);
		//stage.addChild(gameContainer);
		stage.update();
	} else if (event.currentTarget.name == "submitButton") {

		Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV",
			"XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");
		var accountsTable = new AccountsTable();
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
					stage.addChild(gameContainer);
					alert("Account Created");
				} else {
					document.getElementById("username").value = ""
					document.getElementById("password").value = ""
					alert("Account already exists.");
				}
			},
			error: function(error) {
				alert(error.message);
			}
		});
	}
>>>>>>> origin/master
}

function doLogin(event) {
	var accountsTable = new AccountsTable();
	var query = new Parse.Query(AccountsTable);
	query.equalTo("Username", document.getElementById("username").value);
	query.find({
		success: function(results) {
			if (results.length == 1) {
				query.equalTo("Password", document.getElementById("password").value);
				query.find({
					success: function(results) {
						alert(results);
					},
					error: function(error) {
						document.getElementById("username").value = ""
						document.getElementById("password").value = ""
						alert("That password does not match.");
					}
				});
			} else {
				document.getElementById("username").value = ""
				document.getElementById("password").value = ""
				alert("That Username does not exists.");
			}
		},
		error: function(error) {
			alert(error.message);
		}
	});
}

}
