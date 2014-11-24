// defines an object that can move about on the map
// this should pretty much be treated as an interface
function Entity() {
    // instance variables
    this.x = 0;
    this.y = 0;

    // constructor for setting x and y
    if (arguments.length == 2) {
        this.x = arguments[0];
        this.y = arguments[1];
    }
	 if (arguments.length == 4) {
        this.x = arguments[0];
        this.y = arguments[1];
		this.trueWidth = arguments[2];
		this.trueHeight = arguments[3];
    }
}

// gets horizontal velocity
Entity.prototype.deltaX = function(elapsedTime) {
    return 0;
};

// gets vertical velocity
Entity.prototype.deltaY = function(elapsedTime) {
    return 0;
};

// tells this entity to move according to its current velocity
Entity.prototype.move = function(delta) {
    this.x += this.deltaX(delta);
    this.y += this.deltaY(delta);
}

//gets a DisplayObject (EaselJS) representing this object (should be drawn centered at 0,0)
Entity.prototype.getDisplay = function() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(0, 0, 16);
    return circle;
};

// gets the width of this object's display
Entity.prototype.width = function() {
    return 32;
}

// gets the height of this object's display
Entity.prototype.height = function() {
    return 32;
}

// tells this entity to react to a tick
Entity.prototype.tick = function(delta) {
    this.move(delta);
}
