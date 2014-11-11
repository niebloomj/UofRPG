function Player(name, map) {
    this.name = name;
    this.map = map;

    this.health = 16;
    this.maxHealth = 20;

    this.isMoveU = false;
    this.isMoveD = false;
    this.isMoveL = false;
    this.isMoveR = false;

    this.isSprinting = false;
    this.isNoCollide = false;

    this.isMovingLeft = true;

    this.walkSpeed = 5;
    this.sprintMultiplier = 1.5;

    this.currentCharacter = 0;
    this.characters = ["img/Santiago.png", "img/Alex.png", "img/Brad.png", "img/Hayden.png", "img.Naropa.png", "img/Aaron.png"];

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

// tells this entity to move according to its current velocity
Player.prototype.move = function(delta) {
    this.x += this.deltaX(delta);
    this.y += this.deltaY(delta);
};

Player.prototype.tick = function(delta) {
    this.move(delta);
    this.handleCollision();

    if (this.isMoveR && !(this.isMoveL)) {
        this.isMovingLeft = false;
    }
    if (this.isMoveL && !(this.isMoveR)) {
        this.isMovingLeft = true;
    }
};

Player.prototype.handleCollision = function() {

    var d = TILE_D;
    var layerData = this.map.layers[0];

    var cordX = ((this.x / d) | 0);
    var cordY = ((this.y / d) | 0);
    var modX = d - (this.x % d);
    var modY = d - (this.y % d);

    var botXRight = cordX,
        botYRight = cordY,
        topXRight = cordX,
        topYRight = cordY - 1,
        botXLeft = cordX - 1,
        botYLeft = cordY,
        topXLeft = cordX - 1,
        topYLeft = cordY - 1;

    var topLeftIndex = topXLeft + topYLeft * layerData.width;
    var botLeftIndex = botXLeft + botYLeft * layerData.width;
    var topRightIndex = topXRight + topYRight * layerData.width;
    var botRightIndex = botXRight + botYRight * layerData.width;


    var topLeftCollision = false;
    var topRightCollision = false;
    var botLeftCollision = false;
    var botRightCollision = false;

    // Note each statement MUST be in a separate try-catch. This was done intentionally.
    try {
        botLeftCollision = this.map.tilesets[layerData.data[botLeftIndex] - 1].tileproperties[0] == this.map.tilesets[1].tileproperties[0];
    } catch (err) {}

    try {
        topLeftCollision = this.map.tilesets[layerData.data[topLeftIndex] - 1].tileproperties[0] == this.map.tilesets[1].tileproperties[0];
    } catch (err) {}

    try {
        topRightCollision = this.map.tilesets[layerData.data[topRightIndex] - 1].tileproperties[0] == this.map.tilesets[1].tileproperties[0];
    } catch (err) {}

    try {
        botRightCollision = this.map.tilesets[layerData.data[botRightIndex] - 1].tileproperties[0] == this.map.tilesets[1].tileproperties[0];
    } catch (err) {}

    var topCollisionHard = topLeftCollision && topRightCollision;
    var botCollisionHard = botLeftCollision && botRightCollision;
    var leftCollisionHard = topLeftCollision && botLeftCollision;
    var rightCollisionHard = topRightCollision && botRightCollision;

    var topCollision = topCollisionHard || (topLeftCollision && !leftCollisionHard) || (topRightCollision && !rightCollisionHard);
    var botCollision = botCollisionHard || (botLeftCollision && !leftCollisionHard) || (botRightCollision && !rightCollisionHard);
    var leftCollision = leftCollisionHard || (topLeftCollision && !topCollisionHard) || (botLeftCollision && !botCollisionHard);
    var rightCollision = rightCollisionHard || (topRightCollision && !topCollisionHard) || (botRightCollision && !botCollisionHard);

    if (debugMode && this.isNoCollide) {
        //isCollision = false;
        topCollision = false;
        botCollision = false;
        leftCollision = false;
        rightCollision = false;
    }

    if (topCollision || botCollision) {
        while (this.y % d > 0) {
            if (topCollision) {
                this.y++;
            } else {
                this.y--;
            }
        }
        cordY = ((this.y / d) | 0);
        modY = d - (this.y % d);
        topCollision = false;
        botCollision = false;
    }

    if (leftCollision || rightCollision) {
        while (this.x % d > 0) {
            if (leftCollision) {
                this.x++;
            } else {
                this.x--;
            }
        }
        cordX = ((this.x / d) | 0);
        modX = d - (this.x % d);
        leftCollision = false;
        rightCollision = false;
    }
};

Player.prototype.getDisplay = function() {

    var currentCharacter = 0;
    var characters = ["img/Santiago.png", "img/Alex.png", "img/Brad.png", "img/Hayden.png", "img.Naropa.png", "img/Aaron.png"];

    var sprite = new createjs.Bitmap(characters[currentCharacter]);
    sprite.setTransform(0, -1 * this.height());
    if (!(this.isMovingLeft)) {
        sprite.x = this.width();
        sprite.scaleX = -1;
    }

    var parent = new createjs.Container();
    parent.addChild(sprite)
    return parent;

};

Player.prototype.width = function() {
    return 16;
};

Player.prototype.height = function() {
    return 48;
};
