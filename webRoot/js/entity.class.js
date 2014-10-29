// defines an object that can move about on the map
// this should pretty much be treated as an interface
function Entity() {
    // instance variables
    this.x = 0;
    this.y = 0;
    
    if (arguments.length == 2) {
        this.x = arguments[0];
        this.y = arguments[1];
    }
    
    this.deltaX = function(elapsedTime) {
        return 0;
    };
    this.deltaY = function(elapsedTime) {
        return 0;
    };
    
    this.move = function(delta) {
        this.x += this.deltaX(delta);
        this.y += this.deltaY(delta);
    }
    
    this.getDisplay = function() {
    
        circle = new createjs.Graphics();
        circle.beginFill("blue").drawCircle(0, 0, 16);
        return circle;
    };
    
    this.width = function() {
        return 16;
    }
    
    this.height = function() {
        return 16;
    }
}