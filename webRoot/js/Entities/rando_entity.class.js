function Randos(x, y) {
    this.x = x;
    this.y = y;
}

Randos.prototype = new Entity(this.x, this.y, 16, 48);

var countX=0;
var currX=0;
Randos.prototype.deltaX = function(elapsedTime) {
	if (currX == 0 || countX >= 5000){
		countX = 0;
		currX = (Math.random() * (8 - 0) + 0);
		if ((Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 1){
			currX *= -1;
		}
	}
	countX++;
    return currX;
};

var countY=0;
var currY=0;
Randos.prototype.deltaY = function(elapsedTime) {
	if (currY == 0 || countY >= 5000){
		countY = 0;
		currY = (Math.random() * (8 - 0) + 0);
		if ((Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 1){
			currY *= -1;
		}
	}
	countY++;
    return currY;
};

Randos.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    this.move(randomInt(1, 3));

    var isCollision = (new Collider(this.x, this.y, this.width, this.height).contains(player.x, player.y, player.width, player.height));

   if (isCollision) {
        var indexOfRando = entities.indexOf(this);
        if (indexOfRando > -1) {
            entities.splice(indexOfRando, 1);
            initCombat();
            
            if (player.health - 10 > 0) {
                player.health -= 10;
                Messenger().post({
                    parentLocations:['.theGame'],
                    message: "You lost 10 health. Don't touch the randos",
                    type: "error", // info error or success. Use error for negative, success positive, and info neutral
                    hideAfter: "3"
                })
            } else{
                 Messenger().post({
                    message: "You died to randos",
                    type: "error", // info error or success. Use error for negative, success positive, and info neutral
                    hideAfter: "3"
                })
                location.reload();
            }
            
        }
        var audio = new Audio('..\/audio\/giveHurt.mp3');
        audio.volume=audio.volume*.2;
        audio.play();
    }
};

Randos.prototype.move = function(delta) {
    this.x += this.deltaX(delta);
    this.y += this.deltaY(delta);
};

Randos.prototype.getDisplay = function() {
    var sprite = new createjs.Bitmap("img/rando.png");
	return sprite;
};