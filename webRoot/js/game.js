var inMotion = false,
    playerX = 3200,
    playerY = 3200,
    deltaX = 0,
    deltaY = 0,
    isSprinting = false,
    circle,
    isNoCollide = false,
    KEYCODE_DEBUG = 192,
    KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40,
    WALK_SPEED = 5,
    SPRINT_MULTIPLIER = 1.5;

// calculates correct deltaX
function calcDeltaX() {
  return deltaX * (isSprinting ? SPRINT_MULTIPLIER : 1);
}

// calculates correct deltaY
function calcDeltaY() {
  return deltaY * (isSprinting ? SPRINT_MULTIPLIER : 1);
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
    playerX += calcDeltaX();
    playerY += calcDeltaY();
    createMap(playerX, playerY);
}
