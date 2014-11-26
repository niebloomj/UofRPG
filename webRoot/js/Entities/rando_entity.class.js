function Randos(x, y) {
    this.x = x;
    this.y = y;

    this.lastDeltaX = 0;
    this.lastDeltaY = 0;
    this.velocity = 5;
    this.countVector = -1;
}

Randos.prototype = new Entity(this.x, this.y, 16, 48);


// this calculates a vector based on a random angle and a constant magnitude
// math used: http://www.wolframalpha.com/input/?i=sqrt%28v%5E2+-+y%5E2%29+%3D+x+and+tan%28a%29+%3D+y%2Fx
Randos.prototype.calculateVector = function() {
	if (this.countVector < 0 || this.countVector >= 90) {
		this.countVector = 0;

		var angle = Math.random() * (2 * Math.PI);
		var tan = Math.tan(angle);

		var denom = Math.sqrt(Math.pow(tan, 2) + 1);
		this.lastDeltaX = this.velocity / denom;
		this.lastDeltaY = (this.velocity * tan) / denom;

		this.lastDeltaX *= (angle >= Math.PI/2 && angle < 1.5*Math.PI) ? 1 : -1;
	}
	this.countVector++;
}

Randos.prototype.deltaX = function(elapsedTime) {
	return this.lastDeltaX * (elapsedTime / TARGET_FPS);
};

Randos.prototype.deltaY = function(elapsedTime) {
	return this.lastDeltaY * (elapsedTime / TARGET_FPS);
};

Randos.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    this.move(delta);

    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

   if (isCollision) {
        var indexOfRando = entities.indexOf(this);
        if (indexOfRando > -1) {
            entities.splice(indexOfRando, 1);
            initCombat();
            
        }
        var audio = new Audio('..\/audio\/giveHurt.mp3');
        audio.volume=audio.volume*.2;
        audio.play();
    }
};

/*
* TODO: Find a way to use this method and delete above move method.
* This method implements rando collision.
* This method should solve issue of Randos all moving together.
*/
Randos.prototype.move = function(delta) {
	this.calculateVector(delta);
    this.x += this.deltaX(delta);
    this.y += this.deltaY(delta);
	
	/*var mapData = mapDataJson;
	if (isWhiteListed(mapData.layers[0].data[coordToTile(getMovementX()) + coordToTile(getMovementY()) * mapData.layers[0].width])){
		this.x += getMovementX();
		this.y += getMovementY();
	}*/
};

Randos.prototype.getDisplay = function() {
    var sprite = new createjs.Bitmap("img/rando.png");
	return sprite;
};
