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

					});
				});
			});
		});
	});
});

function loginSuccessful() {
	username = currentUser.getUsername();
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
