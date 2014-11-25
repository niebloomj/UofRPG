function saveGame() {
    console.log("Saving Game");
    var query = new Parse.Query(PlayerStatsTable);
    query.equalTo("Username", username);
    query.find({
        success: function(results) {
            if (results.length == 1) {
                var object = results[0];
                object.save(null, {
                    success: function(object) {
                        object.set("Steps", player.totalMoved);
                        object.set("PlayerX", player.x);
                        object.set("PlayerY", player.y);
                        object.set("Health", player.health);
                        object.set("Uros", player.money);
                        object.save();
                    }
                });
            } else if (results.length == 0) {
                var statTable = new PlayerStatsTable()
                statTable.set("Username", username);
                statTable.save(null, {
                    success: function(statTable) {
                        object.set("Steps", player.totalMoved);
                        object.set("PlayerX", player.x);
                        object.set("PlayerY", player.y);
                        object.set("Health", player.health);
                        object.set("Uros", player.money);
                        object.save();
                    }
                });
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

function loadSavedGame() {
    var query = new Parse.Query(PlayerStatsTable);
    query.equalTo("Username", username);
    query.find({
        success: function(results) {
            if (results.length == 1) {
                var object = results[0];
                if (object.get('Uros')) {
                    player.money = object.get('Uros');
                }
                $(".walletAmount").html("$" + player.money + " URos");
                if (object.get('PlayerX')) {
                    player.x = object.get('PlayerX');
                }
                if (object.get('PlayerY')) {
                    player.y = object.get('PlayerY');
                }
                if (object.get('Health')) {
                    player.health = object.get('Health');
                    if (player.health == 0) {
                        player.health = 10;
                    }
                }
                if (object.get('Steps')) {
                    player.totalMoved = object.get('Steps');
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
