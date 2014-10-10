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
    } else if (event.currentTarget.name == "loginButton") {
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
    } else if (event.currentTarget.name == "logSubmitButton") {
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

    // * Setup register container

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

    // * Setup game container (main container holding the game itself)

    var tempLabel = new createjs.Text("This is the container we should use to hold the game.", "bold 20px Arial", "#000000");
    tempLabel.name = "registerLabel";
    tempLabel.x = 275;
    tempLabel.y = 45;
    tempLabel.textAlign = "center";
    tempLabel.textBaseline = "middle";

    gameContainer.addChild(tempLabel);

    stage.update();
}
