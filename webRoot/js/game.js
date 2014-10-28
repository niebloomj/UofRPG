// player coordinates
var playerX = 3200;
var playerY = 3200;

// player status
var isMoveU = false;
var isMoveD = false;
var isMoveL = false;
var isMoveR = false;
var isSprinting = false;
var isNoCollide = false;

var circle;

// key bindings
var KEYCODE_DEBUG = 192;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;

// constants for movement speed
var WALK_SPEED = 5;
var SPRINT_MULTIPLIER = 1.5;

// determines if the player is currently moving
function isInMotion() {
    return isMoveU || isMoveD || isMoveL || isMoveR;
}

// calculates correct deltaX
function deltaX() {
    var deltaX = 0;
    if (isMoveL) {
        deltaX -= WALK_SPEED;
    }
    if (isMoveR) {
        deltaX += WALK_SPEED;
    }
    deltaX *= (isSprinting ? SPRINT_MULTIPLIER : 1)
    return deltaX;
}

// calculates correct deltaY
function deltaY() {
    var deltaY = 0;
    if (isMoveU) {
        deltaY -= WALK_SPEED;
    }
    if (isMoveD) {
        deltaY += WALK_SPEED;
    }
    deltaY *= (isSprinting ? SPRINT_MULTIPLIER : 1)
    return deltaY;
}

function createGame() {
    //Create Game Container
    gameContainer = new createjs.Container();
    gameContainer.mouseMoveOutside = true;

    stage.addChild(gameContainer);

    document.addEventListener("keydown", function(event) {
        keydown(event);
    });

    document.addEventListener("keyup", function(event) {
        keyup(event);
    });

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setFPS(30);
}

function tick(event) {
    playerX += deltaX();
    playerY += deltaY();
    createMap(playerX, playerY);
}
