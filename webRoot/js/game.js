// constant for movement speed
var TARGET_FPS = 30;
var player;
var uro;
var rando;
var healthblob;
var time = 0;
var noTick = false;

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

    tiles = [];
    for (var tsid = 0; tsid < mapData.tilesets.length; tsid++) {
        var tileset = mapData.tilesets[tsid];
        var firstgid = parseInt(tileset.firstgid);

        // special case for multi-tile tilesets
        if (typeof tileset.tiles !== 'undefined') {

            for (var key in tileset.tiles) {
                var tileRef = tileset.tiles[key];

                var tileObj = {
                    image: tileRef.image,
                    bitmap: new createjs.Bitmap(tileRef.image)
                };

                var index = firstgid + parseInt(key);
                tiles[index] = tileObj;
            }
            // case for "normal" tilesets with just one tile
        } else {
            var tileObj = {
                image: tileset.image,
                bitmap: new createjs.Bitmap(tileset.image)
            };

            tiles[firstgid] = tileObj;
        }
    }

    // create the player
    player = new Player("PlaceholderUsername", mapData);
    $("#gameHeaderNavUsername").html(username);

    initHudbar(); // preps hudbars to be drawn
    initMinimap(); // preps minimap to be drawn


    loadSavedGame();
    resetItems();
    initStatsPopover();

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setInterval(1000 / TARGET_FPS);
}

function resetItems() {
    entities = [player];
    jQuery(document).ready(function($) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/find?q=Rochester&units=imperial",
            dataType: "json",
            success: function(json) {
                player.temp = json.list[3].main.temp;
            }
        });
    });
    var mapData = mapDataJson;
    for (var i = 0; i < 20; i++) {
        do {
            var xCo = getRandInt(0, 6400);
            var yCo = getRandInt(0, 6400);
            blob = new HealthBlobs(xCo, yCo);
        } while (!isWhiteListed(mapData.layers[0].data[coordToTile(xCo) + coordToTile(yCo) * mapData.layers[0].width]));
        entities.push(blob);
    }
    for (var i = 0; i < 100; i++) {
        do {
            var xCo = getRandInt(0, 6400);
            var yCo = getRandInt(0, 6400);
            uro = new Uros(xCo, yCo);
        } while (!isWhiteListed(mapData.layers[0].data[coordToTile(xCo) + coordToTile(yCo) * mapData.layers[0].width]));
        entities.push(uro);
    }
    for (var i = 0; i < 50; i++) {
        do {
            var xCo = getRandInt(0, 6400);
            var yCo = getRandInt(0, 6400);
            rando = new Randos(xCo, yCo);
        } while (!isWhiteListed(mapData.layers[0].data[coordToTile(xCo) + coordToTile(yCo) * mapData.layers[0].width]));
        entities.push(rando);
    }
}

function getRandInt(min, max) {
    return Math.random() * (max - min) + min;
}

var benchmarks = [];

// NOT TO BE EXPLICITLY CALLED!!
function tick(event) {
    // tick all the entities (unless we're in combat)
    if (!noTick) {
        if (!inCombat) {
            benchmark("entities", function() {
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    entity.tick(event.delta);

                    if (entity instanceof Randos) {
                        //entity.move2();
                    }
                }
            });
            time++;
        }

        // tick the map
        if (!inCombat) {
            tickMap(event.delta);
        }

        if ((player.isMoveU || player.isMoveD || player.isMoveL || player.isMoveR) && !inCombat) {
            combatTicks++;
        }

        if ((randomInt(500, 50000) < 100 + combatTicks && (player.isMoveU || player.isMoveD || player.isMoveL || player.isMoveR))) {
            initCombat();
            combatTicks = 0;
        }
        if (!inCombat) {
            benchmark("benchmark", function() {
                benchmarkTick();
            });
        }
    } else {
        player.isMoveU = false;
        player.isMoveD = false;
        player.isMoveL = false;
        player.isMoveR = false;
    }
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
        benchmarkStr += "<br>" + benchmarks[i].label + "<span class='pull-right'>" + benchmarks[i].elapsed + "</span>";
        totalElapsed += benchmarks[i].elapsed;
    }

    var totalStyle = "";
    if (totalElapsed < 1000 / TARGET_FPS) {
        totalStyle = "color: green";
    } else {
        totalStyle = "color: yellow";
    }

    benchmarkStr += "<br>TOTAL:<span class='pull-right' style='" + totalStyle + "'>" + totalElapsed + "</span>";

    $("#debugBox").html($("#debugBox").html() + benchmarkStr);

    benchmarks = [];
}

function initStatsPopover() {
    $('.statsPopover').popover({
        content: function() {
            var statsHtml = '';
            statsHtml += '<p class="nobr"><span class="label label-primary">STR</span> ' + player.strength + '</p>';
            statsHtml += '<p class="nobr"><span class="label label-primary">DEF</span> ' + player.defense + '</p>';
            statsHtml += '<p class="nobr"><span class="label label-primary">INT</span> ' + player.intelligence + '</p>';
            statsHtml += '<p class="nobr"><span class="label label-primary">CHR</span> ' + player.charisma + '</p>';
            return statsHtml;
        },
        html: true,
        placement: 'bottom',
        trigger: 'hover'
    });
}
