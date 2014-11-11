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

    // listen to key events
    document.addEventListener("keydown", function(event) {
        keydown(event);
    });
    document.addEventListener("keyup", function(event) {
        keyup(event);
    });


    // json map data at the end of this file for ease of understanding (created on Tiled map editor)
    mapData = mapDataJson;

    var d = TILE_D;

    // prep the tiles to be drawn
    var tilesheet = new createjs.Bitmap("img/tiles.png");

    // coordinates of each tile in the tiles.png file!
    // [x, y, width, height]
    var dims = [
        [32, 0, 32, 32], // grass
        [0, 0, 32, 32] // brick
    ];

    bitmaps = [];
    for (var i = 0; i < dims.length; i++) {
        bitmaps[i] = tilesheet.clone();
        bitmaps[i].sourceRect = new createjs.Rectangle(dims[i][0], dims[i][1], dims[i][2], dims[i][3]);
    }

    colors = [
        "#111111", // grass
        "#eeeeee" // brick
    ]

    // create the player
    player = new Player("PlaceholderUsername", mapData);
    $("#gameHeaderNavUsername").html(username);

    entities = [player];

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setInterval(1000 / TARGET_FPS);
    //createjs.Ticker.setFPS(60); //for the glory of GabeN!
}

function tick(event) {

    // tick all the entities
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        entity.tick(event.delta);
    }

    // tick the map
    tickMap();
}
