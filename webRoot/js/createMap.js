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

    var hudbar = getHudBarGraphics();
    hudbar.setTransform(10, 10);
    gameContainer.addChild(hudbar);


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



// minimap colors [r, g, b]
// note: the indices of this array should correspond to tile IDs
// any color that isn't for a tile doesn't belong in here
var minimapColors = [
    [63, 191, 63], // grass
    [191, 63, 63] // brick
]

// color for crosshair [r, g, b]
var minimapCrosshairColor = [0, 0, 128];

// how visible should the minimap be? (0-255)
var minimapOpacity = 191;

// dimensions of minimap (in tiles)
var minimapHeight = 31;
var minimapWidth = 31;

// size of tiles on minimap (in pixels)
var minimapTileSize = 2;

// gets a DisplayObject representing the minimap
function getMinimapGraphics() {
    var layerData = mapData.layers[0];
    var miniD = minimapTileSize;

    var miniCordX = ((player.x / TILE_D) | 0);
    var miniCordY = ((player.y / TILE_D) | 0);
    var miniModX = miniD - (player.x % miniD);
    var miniModY = miniD - (player.y % miniD);

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var id = ctx.createImageData(miniD, miniD);
    var data = id.data;

    for (var iy = miniCordY - 1 - minimapHeight; iy < miniCordY + 1 + minimapHeight; iy++) {
        for (var ix = miniCordX - 1 - minimapWidth; ix < miniCordX + 1 + minimapWidth; ix++) {

            var idx = ix + iy * layerData.width;
            var color = minimapColors[layerData.data[idx] - 1];

            //TODO someone smarter than me sould simplify this math
            var pixelX = (ix * miniD - miniD - (miniCordX - 1 - minimapWidth) * miniD) - ((miniCordX - 1 - minimapWidth) * miniD - miniD - (miniCordX - 1 - minimapWidth) * miniD);
            var pixelY = (iy * miniD - miniD - (miniCordX - 1 - minimapHeight) * miniD) - ((miniCordY - 1 - minimapHeight) * miniD - miniD - (miniCordX - 1 - minimapHeight) * miniD);

            var midX = ix - (((miniCordX - 1 - minimapWidth) + (miniCordX + 1 + minimapWidth)) / 2);
            var midY = iy - (((miniCordY - 1 - minimapHeight) + (miniCordY + 1 + minimapHeight)) / 2);

            // This runs if we're coloring a cross around the player (just, uh, trust me).
            if (((midX + 1 == 0) || (midY + 1 == 0)) && ((midX + 1 < 2) && (midX + 1 > -2)) && ((midY + 1 < 2) && (midY + 1 > -2))) {
                color = minimapCrosshairColor;
            }

            for (var i = 0; i < data.length; i += 4) {
                data[i + 0] = color[0];
                data[i + 1] = color[1];
                data[i + 2] = color[2];
                data[i + 3] = minimapOpacity;
            }

            ctx.putImageData(id, pixelX, pixelY);
        }
    }
    return new createjs.Bitmap(canvas);
}


// dimensions of a HUD bar
var hudBarWidth = 100;
var hudBarHeight = 16;

// how many pixels of border around a HUD bar
var hudBarBorder = 1;

// how many pixels between an icon and its HUD bar
var hudBarIconPadding = 4;

// health bar colors
var healthBarColorFill = "#e00";
var healthBarColorEmpty = "#aaa";
var healthBarColorBorder = "#222";

// gets a DisplayObject representing the HUD bar(s) like health and stuff
function getHudBarGraphics() {

    var hudBar = new createjs.Container();

    var healthBar = new createjs.Shape();
    var healthBarIcon = new createjs.Bitmap("img/heart.png"); // image must be a square of size hudBarHeight

    // fraction representing player health
    var healthPct = player.health / player.maxHealth;

    // draw border of health bar
    healthBar.graphics.beginFill(healthBarColorBorder);
    healthBar.graphics.rect(0, 0, hudBarWidth + 2 * hudBarBorder, hudBarHeight + 2 * hudBarBorder);

    // draw background of health bar
    healthBar.graphics.beginFill(healthBarColorEmpty);
    healthBar.graphics.rect(hudBarBorder, hudBarBorder, hudBarWidth, hudBarHeight);

    // draw filled section of health bar
    healthBar.graphics.beginFill(healthBarColorFill);
    healthBar.graphics.rect(hudBarBorder, hudBarBorder, hudBarWidth * healthPct, hudBarHeight);

    // add health bar icon to HUD bar
    hudBar.addChild(healthBarIcon);

    // add health bar to HUD bar
    healthBar.setTransform(hudBarHeight + hudBarIconPadding, 0);
    hudBar.addChild(healthBar);

    return hudBar;
}
