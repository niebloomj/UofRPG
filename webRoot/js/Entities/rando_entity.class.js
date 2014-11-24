function Randos(x, y) {
    this.x = x;
    this.y = y;
}

Randos.prototype = new Entity(this.x, this.y, 16, 48);

Randos.prototype.deltaX = function(elapsedTime) {
    return 0;
};

Randos.prototype.deltaY = function(elapsedTime) {
    return 0;
};

Randos.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

  /*  if (isCollision) { //distance < 20) {
        var indexOfRando = entities.indexOf(this);
        if (indexOfRando > -1) {
            entities.splice(indexOfRando, 1);

            //audio by naropian
            //createjs.Sound.alternateExtensions = ["mp3"];
            //createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
            //createjs.Sound.registerSound("..\/img\/Pick up coin.mp3", "sound");
            var audio = new Audio('..\/audio\/coin.mp3');
            audio.volume=audio.volume*.35;
            //audio.volume= .1;
            audio.play();


            money = money + 25;
            var statTable = new PlayerStatsTable()
            var query = new Parse.Query(PlayerStatsTable);
            query.equalTo("Username", username);
            query.find({
                success: function(results) {
                    if (results.length == 1) {
                        var object = results[0];
                        object.save(null, {
                            success: function(object) {
                                object.set("Randos", money);
                                object.save();
                                $("#walletAmount").html("$" + money + " URos");
                            }
                        });
                    } else if (results.length == 0) {
                        statTable.set("Username", username);
                        statTable.save(null, {
                            success: function(statTable) {
                                statTable.set("Randos", money);
                                statTable.save();
                                $("#walletAmount").html("$" + money + " URos");
                            }
                        });
                    }
                },
                error: function(error) {
                    showLoginMessage(error.message, "danger");
                }
            });
        }
    }*/
};

Randos.prototype.move = function(delta) {

};

Randos.prototype.getDisplay = function() {
    var sprite = new createjs.Bitmap("img/rando.png");
	return sprite;
};

/*
 * We need to delete the below methods.  These create OFFSETS of the location which makes calculations completely different.
 * Use .trueWidth and .trueHeight for now.  If these methods are deleted, you can revert back to using just .width and .height
 *
 */
Randos.prototype.width = function() {
    return 0;
};

Randos.prototype.height = function() {
    return 0;
};
