function HealthBlobs(x, y) {
    this.x = x;
    this.y = y;
}

HealthBlobs.prototype = new Entity(this.x, this.y, 32, 32);

HealthBlobs.prototype.deltaX = function(elapsedTime) {
    return 0;
};

HealthBlobs.prototype.deltaY = function(elapsedTime) {
    return 0;
};

HealthBlobs.prototype.tick = function(delta){
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

    if (isCollision){
        var indexOfBlob = entities.indexOf(this);
        if (indexOfBlob > -1) {
            entities.splice(indexOfBlob, 1);
			if (player.health + 10 <= 100){
				player.health += 10;
				Messenger().post({
					message: "You got 10 health!",
					type: "success", // info error or success. Use error for negative, success positive, and info neutral
					hideAfter: "3"
				})
			}else if (player.health != 100){
				player.health = 100;
				Messenger().post({
					message: "You got 10 health!",
					type: "success", // info error or success. Use error for negative, success positive, and info neutral
					hideAfter: "3"
				})
			}
        }
    }
};

HealthBlobs.prototype.move = function(delta) {

};

HealthBlobs.prototype.getDisplay = function() {
    var heart = new createjs.Shape();
    var heart1 = new Image();
    heart1.src = 'img/sprites/heart8_24.png';
    heart.graphics.beginBitmapFill(heart1, "no-repeat").drawRect(0, 0, 24, 24);
    return heart;
};

HealthBlobs.prototype.width = function() {
    return 32;
};

HealthBlobs.prototype.height = function() {
    return 32;
};
