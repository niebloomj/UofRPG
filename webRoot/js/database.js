var lastSave = 0;
var playerStatsObj = false;

function initDatabase(callback) {
	if (playerStatsObj) return;

	dblog("Initializing database...")

	var query = new Parse.Query(PlayerStatsTable);
	query.equalTo("Username", username);
	query.find({
		success: function(results) {
			dblog("Database initialized!");
			if (typeof results[0] !== 'undefined') {
				playerStatsObj = results[0];
			} else {
				playerStatsObj = new PlayerStatsTable()
				playerStatsObj.set("Username", username);
			}

			if (typeof callback !== 'undefined') {
				callback();
			}
		},
		error: function(object, error) {
			dblog("Failed to init database!");
			dblog(error);
		}
	});
}

function dblog(msg) {
	console.log('%c' + msg, 'color:#27ae60;');
}

function saveGame() {
	if (!playerStatsObj) {
		initDatabase(saveGame);
		return;
	}

	var nowSave = new Date().getTime();
	if (nowSave - lastSave > 1500 || lastSave == 0) {
		lastSave = new Date().getTime();
		dblog("Saving game...");

		playerStatsObj.set("Steps", player.totalMoved);
		playerStatsObj.set("PlayerX", player.x);
		playerStatsObj.set("PlayerY", player.y);
		playerStatsObj.set("Health", player.health);
		playerStatsObj.set("Uros", player.money);
		playerStatsObj.set("Inventory", player.inventory);
		playerStatsObj.set("Experience", player.experience);
		playerStatsObj.set("Level", player.level);

		playerStatsObj.save(null, {
			success: function(obj) {
				dblog("Saved!");
			},
			error: function(obj, error) {
				dblog("Save failed!");
				dblog(error);
				showLoginMessage("Failed to save game! Error: "+error.message, "danger");
			}
		});
	}
}

function loadSavedGame() {
	if (!playerStatsObj) {
		initDatabase(loadSavedGame);
		return;
	}
	dblog("Loading game...");

	if (playerStatsObj.get('Uros')) {
		player.setMoney(playerStatsObj.get('Uros'));
	}
	if (playerStatsObj.get('PlayerX')) {
		player.x = playerStatsObj.get('PlayerX');
	}
	if (playerStatsObj.get('PlayerY')) {
		player.y = playerStatsObj.get('PlayerY');
	}
	if (playerStatsObj.get('Health')) {
		player.setHealth(playerStatsObj.get('Health'));
	}
	if (playerStatsObj.get('Steps')) {
		player.totalMoved = playerStatsObj.get('Steps');
	}
	if (playerStatsObj.get('Inventory')) {
		player.inventory = playerStatsObj.get('Inventory');
	}
	if (playerStatsObj.get('Level')) {
		player.level = playerStatsObj.get('Level');
	}
	if (playerStatsObj.get('Experience')) {
		player.experience = playerStatsObj.get('Experience');
	}
	dblog("Game loaded!");
}
