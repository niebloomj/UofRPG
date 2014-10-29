//var circle;

// key bindings
var KEYCODE_DEBUG = 192;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;

// constants for movement speed
var TARGET_FPS = 30;

/*
// determines if the player is currently moving
function isInMotion() {
    return isMoveU || isMoveD || isMoveL || isMoveR;
}

// calculates correct deltaX
function deltaX(elapsedTime) {
    var deltaX = 0;
    if (isMoveL) {
        deltaX -= WALK_SPEED;
    }
    if (isMoveR) {
        deltaX += WALK_SPEED;
    }
    deltaX *= (isSprinting ? SPRINT_MULTIPLIER : 1)
    deltaX *= elapsedTime / TARGET_FPS;
    return Math.floor(deltaX);
}

// calculates correct deltaY
function deltaY(elapsedTime) {
    var deltaY = 0;
    if (isMoveU) {
        deltaY -= WALK_SPEED;
    }
    if (isMoveD) {
        deltaY += WALK_SPEED;
    }
    deltaY *= (isSprinting ? SPRINT_MULTIPLIER : 1)
    deltaY *= elapsedTime / TARGET_FPS;
    return Math.floor(deltaY);
}*/

function createGame() {
    //Create Game Container
    gameContainer = new createjs.Container();
    gameContainer.mouseMoveOutside = true;

    stage.addChild(gameContainer);
    player = new Player("xXx1337SN1PERxXx");
    console.log(player);

    document.addEventListener("keydown", function(event) {
        keydown(event);
    });

    document.addEventListener("keyup", function(event) {
        keyup(event);
    });

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setInterval(1000/TARGET_FPS);
    //createjs.Ticker.setFPS(60); //for the glory of GabeN!
}

function tick(event) {
    //playerX += deltaX(event.delta);
    //playerY += deltaY(event.delta);
    player.move(event.delta);
    createMap(player, event.delta);
}
