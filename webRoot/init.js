var stage, output, holder;
var tileset;
var mapData;
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

	stage.enableMouseOver();

	$("#btnLogin").click(function() {
		console.log("IS THIS RUNNING AT ALL");
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
								$("#formLoginUsername").val("");
								$("#formLoginPassword").val("");
								loginSuccessful();
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
					loginSuccessful();
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

	$('#formLoginUsername').jvFloat();
	$('#formLoginPassword').jvFloat();
	$('#formRegisterUsername').jvFloat();
	$('#formRegisterPassword').jvFloat();
}
init();

function loginSuccessful() {
	$("#loginContainer").addClass("hidden");
	$(".theGame").removeClass("hidden");
	stage.update();
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
