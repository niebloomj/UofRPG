// key bindings
var KEYCODE_DEBUG = 192;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;

// constant for movement speed
var TARGET_FPS = 30;

function createGame() {
    //Create Game Container
    gameContainer = new createjs.Container();
    gameContainer.mouseMoveOutside = true;

    stage.addChild(gameContainer);
    player = new Player("PlaceholderUsername");
    console.log(player);

    document.addEventListener("keydown", function(event) {
        keydown(event);
    });

    document.addEventListener("keyup", function(event) {
        keyup(event);
    });

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setInterval(1000 / TARGET_FPS);
    //createjs.Ticker.setFPS(60); //for the glory of GabeN!
}

function tick(event) {
    player.move(event.delta);
    createMap(player, event.delta);
}
