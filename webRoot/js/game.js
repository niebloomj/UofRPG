var inMotion = false,
    playerX = 3200,
    playerY = 3200,
    deltaX = 0,
    deltaY = 0,
    isSprinting = false,
    circle,
    KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40,
    WALK_SPEED = 5,
    SPRINT_MULTIPLIER = 1.5;

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
    playerX += deltaX * (isSprinting ? SPRINT_MULTIPLIER : 1);
    playerY += deltaY * (isSprinting ? SPRINT_MULTIPLIER : 1);
    createMap(playerX, playerY);
}
