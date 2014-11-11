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

    // gets horizontal velocity
    this.deltaX = function(elapsedTime) {
        return 0;
    };

    // gets vertical velocity
    this.deltaY = function(elapsedTime) {
        return 0;
    };

    // tells this entity to move according to its current velocity
    this.move = function(delta) {
        this.x += this.deltaX(delta);
        this.y += this.deltaY(delta);
    }

    //gets a DisplayObject (EaselJS) representing this object (should be drawn centered at 0,0)
    this.getDisplay = function() {
        circle = new createjs.Graphics();
        circle.beginFill("blue").drawCircle(0, 0, 16);
        return circle;
    };

    // gets the width of this object's display
    this.width = function() {
        return 32;
    }

    // gets the height of this object's display
    this.height = function() {
        return 32;
    }

    // tells this entity to react to a tick
    this.tick = function(delta) {
        this.move(delta);
    }
}
