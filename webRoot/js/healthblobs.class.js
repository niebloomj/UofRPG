function HealthBlobs(x, y) {
    this.x = x;
    this.y = y;
}

HealthBlobs.prototype = new Entity(this.x, this.y);

HealthBlobs.prototype.deltaX = function(elapsedTime) {
    return 0;
};

HealthBlobs.prototype.deltaY = function(elapsedTime) {
    return 0;
};

HealthBlobs.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    //console.log("player x " + player.x);
    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

    if (isCollision) { //distance < 20) {
        var indexOfBlob = entities.indexOf(this);
        if (indexOfBlob > -1) {
            entities.splice(indexOfBlob, 1);
            player.health += 10;
            alert("You got 10 health");
        }
    }
};

HealthBlobs.prototype.move = function(delta) {

};

HealthBlobs.prototype.getDisplay = function() {
    /*var sprite = new createjs.Bitmap("img/coin.png");
	//sprite.setTransform(0,16);

	return sprite;*/
    var circle = new createjs.Shape();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 16);
    return circle;
};

HealthBlobs.prototype.width = function() {
    return 32;
};

HealthBlobs.prototype.height = function() {
    return 32;
};
