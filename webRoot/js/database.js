var lastSave = 0;

function saveGame() {
	var nowSave = new Date().getTime();
	if (nowSave - lastSave > 1500 || lastSave == 0) {
		lastSave = new Date().getTime();
		console.log("Saving Game");
		var query = new Parse.Query(PlayerStatsTable);
		query.equalTo("Username", username);
		query.find({
			success: function(results) {
				if (results.length == 1) {
					var object = results[0];
					object.set("Steps", player.totalMoved);
					object.set("PlayerX", player.x);
					object.set("PlayerY", player.y);
					object.set("Health", player.health);
					object.set("Uros", player.money);
					object.set("Inventory", player.inventory);
					object.set("Experience", player.experience);
					object.set("Level", player.level);
					object.save();
				} else if (results.length == 0) {
					var statTable = new PlayerStatsTable()
					statTable.set("Username", username);

					statTable.set("Steps", player.totalMoved);
					statTable.set("PlayerX", player.x);
					statTable.set("PlayerY", player.y);
					statTable.set("Health", player.health);
					statTable.set("Uros", player.money);
					statTable.set("Inventory", player.inventory);
					statTable.set("Experience", player.experience);
					statTable.set("Level", player.level);
					statTable.save();
				} else {
					//Well this is actually a HUGE PROBLEM if we reach this else
					alert("ERROR ERROR ERROR!!!");
				}
			},
			error: function(error) {
				showLoginMessage(error.message, "danger");
			}
		});
	}
}

function loadSavedGame() {
	var query = new Parse.Query(PlayerStatsTable);
	query.equalTo("Username", username);
	query.find({
		success: function(results) {
			if (results.length == 1) {
				var object = results[0];
				if (object.get('Uros')) {
					player.setMoney(object.get('Uros'));
				} else {
					player.setMoney(player.money);
				}
				if (object.get('PlayerX')) {
					player.x = object.get('PlayerX');
				}
				if (object.get('PlayerY')) {
					player.y = object.get('PlayerY');
				}
				if (object.get('Health')) {
					player.setHealth(object.get('Health'));
				}
				if (object.get('Steps')) {
					player.totalMoved = object.get('Steps');
				}
				if (object.get('Inventory')) {
					player.inventory = object.get('Inventory');
					// var arr = object.get('Inventory')
					// console.log(arr);
					//    for (var i = 0; i < arr.length; i ++){
					//    	player.addToInventory(arr[i]);
					//    	console.log(arr[i]);
					//    }
				}
				if (object.get('Level')) {
					player.level = object.get('Level');
				}
				if (object.get('Experience')) {
					player.experience = object.get('Experience');
				}
			} else {
				console.log("New Game");
			}
		},
		error: function(error) {
			showLoginMessage(error.message, "danger");
		}
	});
}
