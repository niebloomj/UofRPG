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

    // preps hudbars to be drawn
    initializeHudbars();

    // create the player
    player = new Player("PlaceholderUsername", mapData);
    $("#gameHeaderNavUsername").html(username);

    entities = [player];

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setInterval(1000 / TARGET_FPS);
    //createjs.Ticker.setFPS(60); //for the glory of GabeN!
}

var benchmarks = [];

function tick(event) {


    // tick all the entities
    benchmark("entities", function(){
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            entity.tick(event.delta);
        }
    });

    // tick the map
    tickMap(event.delta);

    benchmark("benchmark", function(){
        benchmarkTick();
    });
}

function benchmark(label, func) {
    if (!debugMode || !benchmarkingMode) {
        func();
        return;
    }
    var before = Date.now();
    func();
    var after = Date.now();
    var elapsed = after - before;
    var mark = {
        label: label,
        elapsed: elapsed
    };
    benchmarks.push(mark);
}

function benchmarkTick() {
    if (!debugMode || !benchmarkingMode) {
        return;
    }
    var benchmarkStr = "<br><br><strong>BENCHMARKS</strong>";
    var totalElapsed = 0;
    for (var i = 0; i < benchmarks.length; i++) {
        benchmarkStr += "<br>" + benchmarks[i].label + ":<span class='pull-right'>" + benchmarks[i].elapsed +"</span>";
        totalElapsed += benchmarks[i].elapsed;
    }
    benchmarkStr+="<br>TOTAL:<span class='pull-right'>" + totalElapsed +"</span>";

    $("#debugBox").html($("#debugBox").html() + benchmarkStr);

    benchmarks=[];
}