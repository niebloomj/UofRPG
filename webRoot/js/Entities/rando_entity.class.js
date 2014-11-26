function Randos(x, y) {
    this.x = x;
    this.y = y;

    this.lastDeltaX = 0;
    this.lastDeltaY = 0;
    this.velocity = 3;
    this.timeBetweenVectorChange = 120;
    this.currTimeBetweenVectorChange = this.timeBetweenVectorChange;
    this.timeBetweenVectorChangeVariance = 30;
    this.countVector = Math.random() * this.timeBetweenVectorChange;
}

Randos.prototype = new Entity(this.x, this.y, 16, 48);


// this calculates a vector based on a random angle and a constant magnitude
// math used: http://www.wolframalpha.com/input/?i=sqrt%28v%5E2+-+y%5E2%29+%3D+x+and+tan%28a%29+%3D+y%2Fx
Randos.prototype.calculateVector = function(elapsedTime) {
	if (this.countVector < 0 || this.countVector >= this.currTimeBetweenVectorChange) {
		this.countVector = 0;
		this.currTimeBetweenVectorChange = Math.ceil(this.timeBetweenVectorChange + (Math.random() * 2 * this.timeBetweenVectorChangeVariance) - this.timeBetweenVectorChangeVariance);
		console.log(this.currTimeBetweenVectorChange);

		var angle = Math.random() * (2 * Math.PI);
		var tan = Math.tan(angle);

		var denom = Math.sqrt(Math.pow(tan, 2) + 1);
		this.lastDeltaX = this.velocity / denom;
		this.lastDeltaY = (this.velocity * tan) / denom;

		this.lastDeltaX *= (angle >= Math.PI/2 && angle < 1.5*Math.PI) ? -1 : 1;
	}
	this.countVector += elapsedTime / TARGET_FPS;
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

Randos.prototype.move = function(delta) {
	this.calculateVector(delta);
   
	var mapData = mapDataJson;
	
	if (isWhiteListed(mapData.layers[0].data[coordToTile(this.x+(this.deltaX(delta) > 0 ? 32 : -32)) + coordToTile(this.y+(this.deltaY(delta) > 0 ? 32 : -32)) * mapData.layers[0].width])){
		this.x += ((this.deltaX(delta) >0) ? this.deltaX(delta) : (this.deltaX(delta)*1));
		this.y += ((this.deltaY(delta) >0 )? this.deltaY(delta) : (this.deltaY(delta)*1));
	}else{
		this.lastDeltaX*=-1;
		this.lastDeltaY*=-1;
	}
};

Randos.prototype.getDisplay = function() {
    var sprite = new createjs.Bitmap("img/rando.png");
	return sprite;
};
