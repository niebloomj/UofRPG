function Uros(x, y) {
	this.x = x;
	this.y = y;
}

Uros.prototype = new Entity(this.x, this.y);

Uros.prototype.deltaX = function(elapsedTime) {
	return 0;
};

Uros.prototype.deltaY = function(elapsedTime) {
	return 0;
};

Uros.prototype.tick = function(delta) {

};

Uros.prototype.move = function(delta) {

};

Uros.prototype.getDisplay = function() {
	var circle = new createjs.Shape();
	circle.graphics.beginFill("yellow").drawCircle(0, 0, 16);
	return circle;
};

Uros.prototype.width = function() {
	return 32;
};

Uros.prototype.height = function() {
	return 32;
};
