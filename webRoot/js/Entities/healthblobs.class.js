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

HealthBlobs.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

    if (isCollision) {
        var indexOfBlob = entities.indexOf(this);
        if (indexOfBlob > -1) {
            entities.splice(indexOfBlob, 1);
            if (player.health + 10 <= 100) {
                player.health += 10;
                Messenger().post({
                    message: "You got 10 health!",
                    type: "success", // info error or success. Use error for negative, success positive, and info neutral
                    hideAfter: "3"
                })
            } else if (player.health != 100) {
                player.health = 100;
                Messenger().post({
                    message: "You got 10 health!",
                    type: "success", // info error or success. Use error for negative, success positive, and info neutral
                    hideAfter: "3"
                })
            }
        }
        var audio = new Audio('..\/audio\/gainHealth.mp3');
        audio.play();
    }
};

HealthBlobs.prototype.move = function(delta) {

};

HealthBlobs.prototype.getDisplay = function() {
    var circle = new createjs.Shape();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 16);
    return circle;
};

HealthBlobs.prototype.width = function() {
    return 0; //32;
};

HealthBlobs.prototype.height = function() {
    return 0; //32;
};
