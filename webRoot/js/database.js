function saveGame() {
    var steps = new PlayerStatsTable()
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
                        object.save();
                        console.log(player.totalMoved + " Total Steps Taken");
                    }
                });
            } else if (results.length == 0) {
                steps.set("Username", username);
                steps.save(null, {
                    success: function(steps) {
                        object.set("Steps", player.totalMoved);
                        object.set("PlayerX", player.x);
                        object.set("PlayerY", player.y);
                        object.set("Health", player.health);
                        object.save();
                        console.log(player.totalMoved + " Total Steps Taken");
                    }
                });
            }
        },
        error: function(error) {
            showLoginMessage(error.message, "danger");
        }
    });
}
