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

    var minimap = getMinimapDisplay();
    minimap.setTransform(27 * TILE_D - 11, 10); //There's probably a better way to calculate the X coordinate
    gameContainer.addChild(minimap);

    var hudbar = getHudbarDisplay();
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


// MINIMAP SETTINGS
// minimap colors for tiles [r, g, b, a]
var minimapColors = [
    [63, 191, 63, 255], // grass
    [191, 63, 63, 255] // brick
]

var minimapCrosshairColor = [0, 0, 128, 255]; // color for crosshair [r, g, b, a]
var minimapOpacity = 0.7; // how visible is minimap? (0-1)

var minimapWidth = 31; // width of minimap (in tiles)
var minimapHeight = 31; // height of minimap (in tiles)
var minimapTileSize = 2; // size of tiles on minimap (in px)

/**
 * Gets a DisplayObject representing the minimap
 * pixel drawing technique based on http://community.createjs.com/discussions/easeljs/1291-bitmap-pixel-manipulation
 */
function getMinimapDisplay() {
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
                data[i + 3] = color[3] * minimapOpacity;
            }

            ctx.putImageData(id, pixelX, pixelY);
        }
    }
    return new createjs.Bitmap(canvas);
}





// HUDBAR SETTINGS
var hudbarWidth = 192; // hudbar width (in px)
var hudbarHeight = 24; // hudbar height (in px)

var hudbarBorder = 3; // border inside the hudbar (in px)
  
// dimensions of inner hudbar (e.g. excluding border)
var hudbarInnerWidth = hudbarWidth - hudbarBorder * 2;
var hudbarInnerHeight = hudbarHeight - hudbarBorder * 2;

var hudbarIconSize = 24; // width of hudbar icon (in px)
var hudbarIconPadding = 4; // separation width between icon and hudbar (in px)

// HEALTHBAR SETTINGS
var healthbarColorFill = "#e00"; // color of available health
var healthbarColorEmpty = "#aaa"; // color of missing health
var healthbarColorBorder = "#222"; // color of hudbar border
var healthbarIconPath = "img/sprites/heart8_24.png"; // square of size hudbarIconSize

var healthbarGraphics, healthbarIcon;


/**
 * Gets a DisplayObject representing the hudbars like health and stuff
 */
function getHudbarDisplay() {

    // create images;
    var hudbar = new createjs.Container();
    var healthbar = new createjs.Shape(healthbarGraphics.clone());

    var healthPct = player.health / player.maxHealth; // fraction representing player health


    // draw filled section of healthbar
    healthbar.graphics.f(healthbarColorFill);
    healthbar.graphics.r(
        hudbarBorder, hudbarBorder, 
        Math.floor(hudbarInnerWidth * healthPct), 
        hudbarInnerHeight
    );

    // add health bar icon to hudbar
    hudbar.addChild(healthbarIcon);

    // add health bar to hudbar
    healthbar.setTransform(hudbarIconSize + hudbarIconPadding, 0);
    hudbar.addChild(healthbar);

    return hudbar;
}

/**
 * Prepares hudbars for first draw
 */
function initializeHudbars() {
    healthbarGraphics = new createjs.Graphics();

    // draw border of health bar
    healthbarGraphics.f(healthbarColorBorder);
    healthbarGraphics.r(
        0, 0, 
        hudbarWidth, 
        hudbarHeight
    );

    // draw background of health bar
    healthbarGraphics.f(healthbarColorEmpty);
    healthbarGraphics.r(
        hudbarBorder, hudbarBorder, 
        hudbarInnerWidth, 
        hudbarInnerHeight
    );

    healthbarIcon = new createjs.Bitmap(healthbarIconPath);
}
