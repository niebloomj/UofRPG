function Player(name) {
    this.name = name;

    this.isMoveU = false;
    this.isMoveD = false;
    this.isMoveL = false;
    this.isMoveR = false;

    this.isSprinting = false;
    this.isNoCollide = false;

    this.walkSpeed = 5;
    this.sprintMultiplier = 1.5;
}

// defines a human-controlled entity
Player.prototype = new Entity(3200, 3200);


Player.prototype.deltaX = function(elapsedTime) {
    var deltaX = 0;
    if (this.isMoveL) {
        deltaX -= this.walkSpeed;
    }
    if (this.isMoveR) {
        deltaX += this.walkSpeed;
    }
    deltaX *= (this.isSprinting ? this.sprintMultiplier : 1)
    deltaX *= elapsedTime / TARGET_FPS;
    return Math.floor(deltaX);
};

Player.prototype.deltaY = function(elapsedTime) {
    var deltaY = 0;
    if (this.isMoveU) {
        deltaY -= this.walkSpeed;
    }
    if (this.isMoveD) {
        deltaY += this.walkSpeed;
    }
    deltaY *= (this.isSprinting ? this.sprintMultiplier : 1)
    deltaY *= elapsedTime / TARGET_FPS;
    return Math.floor(deltaY);
};

Player.prototype.move = function(delta) {
    this.x += this.deltaX(delta);
    this.y += this.deltaY(delta);
}

Player.prototype.getDisplay = function() {
    circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(0, 0, 16);
    return circle;
};

Player.prototype.width = function() {
    return 32;
}

Player.prototype.height = function() {
    return 32;
}

Player.prototype.isInMotion = function() {
    return isMoveU || isMoveD || isMoveL || isMoveR;
};
