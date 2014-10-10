var stage, output, holder;
var startContainer, menuContainer, registerContainer, gameContainer;
var poopiepie;

function init() {
    /*
     * Create the stage
     */
<<<<<<< HEAD
	 var test = 4;
=======
	 var test = 3;
>>>>>>> origin/master
    stage = new createjs.Stage("demoCanvas");
    startContainer = new createjs.Container();
    menuContainer = new createjs.Container();
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

    /*
     * Setup register container
     */
    var usernameLabel = new createjs.Text("Username:", "bold 40px Arial", "#000000"); //DC143C
    usernameLabel.name = "registerLabel";
    usernameLabel.x = 225;
    usernameLabel.y = 55;
    usernameLabel.textAlign = "center";
    usernameLabel.textBaseline = "middle";

    var passwordLabel = new createjs.Text("Password:", "bold 40px Arial", "#000000"); //DC143C
    passwordLabel.name = "registerLabel";
    passwordLabel.x = 225;
    passwordLabel.y = 175;
    passwordLabel.textAlign = "center";
    passwordLabel.textBaseline = "middle";

    registerContainer.addChild(usernameLabel);
    registerContainer.addChild(passwordLabel);

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
}

function doLogin(event) {
    window.alert("Will animate transition.");
}
