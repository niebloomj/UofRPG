var mapData;
var screenWidth = 15;
var screenHeight = 8;
var TILE_D = 32;
var bitmaps;
var entities;


function tickMap(delta) {
    gameContainer.removeAllChildren();

    var layerData = mapData.layers[0];
    var d = TILE_D;

    var cordX = ((player.x / d) | 0);
    var cordY = ((player.y / d) | 0);
    var modX = d - (player.x % d);
    var modY = d - (player.y % d);

    for (var iy = cordY - 1 - screenHeight; iy < cordY + 1 + screenHeight; iy++) {
        for (var ix = cordX - 1 - screenWidth; ix < cordX + 1 + screenWidth; ix++) {
            // create a new Bitmap for each cell
            var cellBitmap;
            // layer data has single dimension array
            var idx = ix + iy * layerData.width;
            // tilemap data uses 1 as first value, EaselJS uses 0 (sub 1 to load correct tile)

            cellBitmap = bitmaps[layerData.data[idx] - 1].clone();

            //cellBitmap.gotoAndStop(layerData.data[idx] - 1);
            // isometrix tile positioning based on X Y order from Tiled
            cellBitmap.x = ix * d - d + modX - (cordX - 1 - screenWidth) * d;
            cellBitmap.y = iy * d - d + modY - (cordY - 1 - screenHeight) * d;

            gameContainer.addChild(cellBitmap);
        }
    }

    // loop to reposition all entities and then draw them
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var display = entity.getDisplay();
        display.setTransform(
            entity.x - (entity.x - entity.width() / 2 - screenWidth * d),
            entity.y - (entity.y - entity.height() / 2 - screenHeight * d)
        );
        gameContainer.addChild(display);
    }

    var minimap = getMinimapGraphics();
    minimap.setTransform(27 * TILE_D - 11, 10); //There's probably a better way to calculate the X coordinate
    gameContainer.addChild(minimap);


    // overlay for debug mode
    if (debugMode) {
        var overlayStr = "";
        var LBREAK = "<br>";

        var measuredFpsStr = createjs.Ticker.getMeasuredFPS().toFixed(2);
        overlayStr += "fps: " + measuredFpsStr;

        overlayStr += LBREAK;
        overlayStr += "coords: " + cordX + "," + cordY;

        overlayStr += LBREAK;
        overlayStr += "exact: " + player.x + "," + player.y;

        if (player.isNoCollide) {
            overlayStr += LBREAK;
            overlayStr += "no collision"
        }
        $("#debugBox").html(overlayStr);
        $("#debugBox").removeClass("hidden");
    } else {
        $("#debugBox").addClass("hidden");
    }

    stage.update();
}

var colors;
var minimapHeight = 31;
var minimapWidth = 31;
var minimapTileSize = 2;

function getMinimapGraphics() {
    var layerData = mapData.layers[0];
    var miniD = minimapTileSize;

    var miniCordX = ((player.x / TILE_D) | 0);
    var miniCordY = ((player.y / TILE_D) | 0);
    var miniModX = miniD - (player.x % miniD);
    var miniModY = miniD - (player.y % miniD);

    var minimap = new createjs.Graphics();

    minimap.beginFill("red");

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var id = ctx.createImageData(miniD, miniD);
    var data = id.data;

    for (var iy = miniCordY - 1 - minimapHeight; iy < miniCordY + 1 + minimapHeight; iy++) {
        for (var ix = miniCordX - 1 - minimapWidth; ix < miniCordX + 1 + minimapWidth; ix++) {

            var idx = ix + iy * layerData.width;
            var color = colors[layerData.data[idx] - 1];

            //TODO someone smarter than me sould simplify this math
            var pixelX = (ix * miniD - miniD - (miniCordX - 1 - minimapWidth) * miniD) - ((miniCordX - 1 - minimapWidth) * miniD - miniD - (miniCordX - 1 - minimapWidth) * miniD);
            var pixelY = (iy * miniD - miniD - (miniCordX - 1 - minimapHeight) * miniD) - ((miniCordY - 1 - minimapHeight) * miniD - miniD - (miniCordX - 1 - minimapHeight) * miniD);
            var midX = ix - (((miniCordX - 1 - minimapWidth) + (miniCordX + 1 + minimapWidth)) / 2);
            var midY = iy - (((miniCordY - 1 - minimapHeight) + (miniCordY + 1 + minimapHeight)) / 2);

            // This runs if we're coloring a cross around the player (just, uh, trust me).
            if (((midX + 1 == 0) || (midY + 1 == 0)) && ((midX + 1 < 2) && (midX + 1 > -2)) && ((midY + 1 < 2) && (midY + 1 > -2))) {
                color = colors[2];
            }

            for (var i = 0; i < data.length; i += 4) {
                data[i + 0] = color[0];
                data[i + 1] = color[1];
                data[i + 2] = color[2];
                data[i + 3] = color[3];
            }

            ctx.putImageData(id, pixelX, pixelY);
        }
    }
    return new createjs.Bitmap(canvas);
}
