var stage, output, holder;
var tileset;
var mapData;
var startContainer, menuContainer, loginContainer, registerContainer, gameContainer;
var PlayerStatsTable = Parse.Object.extend("PlayerStats");
Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV",
    "XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");
var currentUser;
var username = null;
var benchmarkingMode = false;
var debugMode = false;
var backgroundMusic = new Audio('..\/audio\/BackgroundMusic.mp3');
var fightMusic = new Audio('..\/audio\/FightMusic.mp3');

function init() {

    stage = new createjs.Stage("demoCanvas");
    startContainer = new createjs.Container();
    menuContainer = new createjs.Container();
    loginContainer = new createjs.Container();
    registerContainer = new createjs.Container();

    stage.enableMouseOver();

    $("#btnLogin").click(function() {
        $(".paneButtons").addClass("hidden");
        $(".paneLogin").removeClass("hidden");
        currentUser = Parse.User.current();
        if (currentUser) {
            loginSuccessful();
        }
    });

    $("#btnRegister").click(function() {
        $(".paneButtons").addClass("hidden");
        $(".paneRegister").removeClass("hidden");
    });

    $("#formLoginSubmit").click(function() {
        Parse.User.logIn($("#formLoginUsername").val(),
            $("#formLoginPassword").val(), {
                success: function(user) {
                    currentUser = Parse.User.current();
                    loginSuccessful();
                    $("#formLoginUsername").val("");
                    $("#formLoginPassword").val("");
                },
                error: function(user, error) {
                    $("#formLoginPassword").val("");
                    showLoginMessage("That username or password does not match.", "danger");
                }
            });
    });

    $("#formRegisterSubmit").click(function() {
        if ($("#formRegisterUsername").val().length >= 5) {
            var user = new Parse.User();
            user.set("username", $("#formRegisterUsername").val());
            user.set("password", $("#formRegisterPassword").val());
            user.signUp(null, {
                success: function(user) {
                    stage.removeChild(registerContainer);
                    showLoginMessage("Account created!", "success");
                    currentUser = Parse.User.current();
                    loginSuccessful();
                },
                error: function(user, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        } else {
            showLoginMessage("Username must be at least 5 characters", "danger");
        }
    });
    $("#loginContainerAlertCloseBtn").click(function() {
        $("#loginContainerAlert").addClass("hidden");
    });
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom',
        theme: 'flat'
    }
}

// loads up all the scripts and preps the game
function loadItUp() {
    var scripts = new getScripts(
        [
            'js/keyevents.js',
            'js/store.js',
            'js/database.js',
            'js/audio.js',
            'js/game.js',
            'maps/main.map.js',
            'js/createmap.js',
            'js/Entities/entity.class.js',
            'js/Entities/player.class.js',
            'js/Entities/uros.class.js',
            'js/Entities/rando_entity.class.js',
            'js/combat.js',
            'js/collider.class.js',
            'js/Entities/healthblobs.class.js',
            'js/Enemies/enemy.class.js',
            'js/Enemies/aaron.class.js',
            'js/Enemies/alex.class.js',
            'js/Enemies/brad.class.js',
            'js/Enemies/hayden.class.js',
            'js/Enemies/jacob.class.js',
            'js/Enemies/naropa.class.js'
        ],
        function() {
            /* Optional - Executed each time a script has loaded (Use for Progress updates?) */
        },
        function() {
            console.log('%cAll scripts loaded!', 'color:#ffbc2e;');
            $(".paneLoading").addClass("hidden");
            $(".paneButtons").removeClass("hidden");
            init();
        }
    );
    scripts.fetch();
}

function loginSuccessful() {
    username = currentUser.getUsername();
    $("#loginContainer").addClass("hidden");
    $("#loginHeader").addClass("hidden");
    $("body").addClass("inGame");
    selectPlayer();
    backgroundMusic.loop = true;
    fightMusic.loop = true;
    backgroundMusic.play();
}

function selectPlayer() {
    $('#characterModal').modal('show');
    //     $(document).unbind('keydown', disableKeyboard);

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

    username = currentUser.getUsername();
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


// taken from http://stackoverflow.com/a/21817543
function getScripts(scripts, onScript, onComplete) {
    this.async = true;
    this.cache = false;
    this.data = null;
    this.complete = function() {
        $.scriptHandler.loaded();
    };
    this.scripts = scripts;
    this.onScript = onScript;
    this.onComplete = onComplete;
    this.total = scripts.length;
    this.progress = 0;
};

getScripts.prototype.fetch = function() {
    $.scriptHandler = this;
    var src = this.scripts[this.progress];
    console.log('%cFetching %s', 'color:#ffbc2e;', src);

    $.ajax({
        crossDomain: true,
        async: this.async,
        cache: this.cache,
        type: 'GET',
        url: src,
        data: this.data,
        statusCode: {
            200: this.complete
        },
        dataType: 'script'
    });
};

getScripts.prototype.loaded = function() {
    this.progress++;
    if (this.progress >= this.total) {
        if (this.onComplete) this.onComplete();
    } else {
        this.fetch();
    };
    if (this.onScript) this.onScript();
};
