function Uros(x, y) {
    this.x = x;
    this.y = y;
}

Uros.prototype = new Entity(this.x, this.y, 32, 32);

Uros.prototype.deltaX = function(elapsedTime) {
    return 0;
};

Uros.prototype.deltaY = function(elapsedTime) {
    return 0;
};

Uros.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

    if (isCollision) { //distance < 20) {
        var indexOfUro = entities.indexOf(this);
        if (indexOfUro > -1) {
            entities.splice(indexOfUro, 1);

            //audio by naropian
            //createjs.Sound.alternateExtensions = ["mp3"];
            //createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
            //createjs.Sound.registerSound("..\/img\/Pick up coin.mp3", "sound");
            var audio = new Audio('..\/audio\/coin.mp3');
            audio.volume=audio.volume*.5;
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
                                object.set("Uros", money);
                                object.save();
                                $("#walletAmount").html("$" + money + " URos");
                            }
                        });
                    } else if (results.length == 0) {
                        statTable.set("Username", username);
                        statTable.save(null, {
                            success: function(statTable) {
                                statTable.set("Uros", money);
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
    }
};
/*
function loadHandler(event) {
    consol.log("kiss my bum");
    // This is fired for each sound that is registered.
    var instance = createjs.Sound.play("sound"); // play using id.  Could also use full sourcepath or event.src.
    instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
    instance.volume = 0.5;
}
*/
Uros.prototype.move = function(delta) {

};

Uros.prototype.getDisplay = function() {
    var sprite = new createjs.Bitmap("img/coin.png");
	//sprite.setTransform(0,16);

	return sprite;
    // var circle = new createjs.Shape();
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("yellow").drawCircle(0, 0, 16);
    // return circle;
};

/*
 * We need to delete the below methods.  These create OFFSETS of the location which makes calculations completely different.
 * Use .trueWidth and .trueHeight for now.  If these methods are deleted, you can revert back to using just .width and .height
 *
 */
Uros.prototype.width = function() {
    return 0;
};

Uros.prototype.height = function() {
    return 0;
};
