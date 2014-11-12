var stage, output, holder;
var tileset;
var mapData;
var startContainer, menuContainer, loginContainer, registerContainer, gameContainer;
var AccountsTable = Parse.Object.extend("Accounts");
Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV",
    "XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");
var accountsTable = new AccountsTable();
var username = null;

var benchmarkingMode = false;
var debugMode = false;
if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    if (hash == "debug") {
        debugMode = true;
    }
}

function init() {
    //Create the Stage
    stage = new createjs.Stage("demoCanvas");
    startContainer = new createjs.Container();
    menuContainer = new createjs.Container();
    loginContainer = new createjs.Container();
    registerContainer = new createjs.Container();

    stage.enableMouseOver();

    $("#btnLogin").click(function() {
        $(".paneButtons").addClass("hidden");
        $(".paneLogin").removeClass("hidden");
    });

    $("#btnRegister").click(function() {
        $(".paneButtons").addClass("hidden");
        $(".paneRegister").removeClass("hidden");
    });

    $("#formLoginSubmit").click(function() {
        var query = new Parse.Query(AccountsTable);
        query.equalTo("Username", $("#formLoginUsername").val());
        query.find({
            success: function(results) {
                if (results.length == 1) {
                    query.equalTo("Password", $("#formLoginPassword").val());
                    query.find({
                        success: function(results) {
                            if (results.length == 1) {
                                loginSuccessful($("#formLoginUsername").val());
                                $("#formLoginUsername").val("");
                                $("#formLoginPassword").val("");
                            } else {
                                $("#formLoginPassword").val("");
                                showLoginMessage("That password does not match.", "danger");
                            }
                        },
                        error: function(error) {
                            showLoginMessage(error.message, "danger");
                        }
                    });
                } else {
                    $("#formLoginUsername").val("");
                    $("#formLoginPassword").val("");
                    showLoginMessage("That username does not exist.", "warning");
                }
            },
            error: function(error) {
                showLoginMessage(error.message, "danger");
            }
        });
    });

    $("#formRegisterSubmit").click(function() {
        var query = new Parse.Query(AccountsTable);
        query.equalTo("Username", $("#formRegisterUsername").val());
        query.find({
            success: function(results) {
                if (results.length == 0) {
                    accountsTable.save({
                        Username: $("#formRegisterUsername").val(),
                        Password: $("#formRegisterPassword").val()
                    });
                    stage.removeChild(registerContainer);
                    showLoginMessage("Account created!", "success");
                    loginSuccessful($("#formRegisterUsername").val());
                } else {
                    $("#formRegisterUsername").val("");
                    $("#formRegisterPassword").val("");
                    showLoginMessage("Username already exists.", "danger");
                }
            },
            error: function(error) {
                showLoginMessage(error.message, "danger");
            }
        });
    });

    $("#loginContainerAlertCloseBtn").click(function() {
        $("#loginContainerAlert").addClass("hidden");
    });
}
init();

/*$.ajaxSetup({
  cache: true
});*/

// loads up all the scripts
$.getScript("js/keyevents.js", function() {
    $.getScript("js/game.js", function() {
        $.getScript("js/main.map.js", function() {
            $.getScript("js/createmap.js", function() {
                $.getScript("js/entity.class.js", function() {
                    $.getScript("js/player.class.js", function() {
                        if (debugMode) {
                            loginSuccessful("DEBUG USER");
                        }
                    });
                });
            });
        });
    });
});

function loginSuccessful(name) {
    username = name;
    $("#loginContainer").addClass("hidden");
    $("#loginHeader").addClass("hidden");
    selectPlayer();
}

function selectPlayer() {

    $("#btnSantiago").click(function() {
        $(".paneButtons").addClass("hidden");
        player.setPlayer(0);
    });
    $("#btnAlex").click(function() {
        $(".paneButtons").addClass("hidden");
        player.setPlayer(1);
    });
    $("#btnBrad").click(function() {
        $(".paneButtons").addClass("hidden");
        player.setPlayer(2);
    });
    $("#btnNaropa").click(function() {
        $(".paneButtons").addClass("hidden");
        player.setPlayer(3);
    });
    $("#btnAaron").click(function() {
        $(".paneButtons").addClass("hidden");
        player.setPlayer(4);
    });
    $("#btnHayden").click(function() {
        $(".paneButtons").addClass("hidden");
        player.setPlayer(5);
    });

    $(".theGame").removeClass("hidden");
    $("#gameHeader").removeClass("hidden");
    createGame();
}

function showLoginMessage(message, level) {
    $("#loginContainerAlert").removeClass("hidden");
    $("#loginContainerAlert").removeClass("alert-success");
    $("#loginContainerAlert").removeClass("alert-danger");
    $("#loginContainerAlert").removeClass("alert-warning");
    $("#loginContainerAlert").removeClass("alert-info");
    $("#loginContainerAlert").addClass("alert-" + level);
    $("#loginContainerAlertContent").html(message);
}
