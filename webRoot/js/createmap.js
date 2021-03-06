var mapData;
var screenWidth = 15;
var screenHeight = 8;
var TILE_D = 32;
var entities;
var tiles;

function tickMap(delta) {
    gameContainer.removeAllChildren();

    var layerData = mapData.layers[0];
    var d = TILE_D;

    var cordX = ((player.x / d) | 0);
    var cordY = ((player.y / d) | 0);
    var modX = d - (player.x % d);
    var modY = d - (player.y % d);

    benchmark("d:tiles", function() {
        for (var iy = cordY - 1 - screenHeight; iy < cordY + 1 + screenHeight; iy++) {
            for (var ix = cordX - 1 - screenWidth; ix < cordX + 1 + screenWidth; ix++) {
                // create a new Bitmap for each cell
                var cellBitmap;
                // layer data has single dimension array
                var idx = ix + iy * layerData.width;
                // tilemap data uses 1 as first value, EaselJS uses 0 (sub 1 to load correct tile)

                cellBitmap = getBitmap(layerData.data[idx]).clone();

                // isometrix tile positioning based on X Y order from Tiled
                cellBitmap.x = ix * d - d + modX - (cordX - 1 - screenWidth) * d;
                cellBitmap.y = iy * d - d + modY - (cordY - 1 - screenHeight) * d;

                gameContainer.addChild(cellBitmap);
            }
        }
    });

    benchmark("d:entities", function() {
        // loop to reposition all entities and then draw them
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var tX = entity.x - (player.x - screenWidth * d);
            var tY = entity.y - (player.y - screenHeight * d);
            if (tX + entity.width > 0 && tX < stage.canvas.width && tY + entity.height > 0 && tY < stage.canvas.height) {
                var display = entity.getDisplay();
                display = display.setTransform(tX, tY);
                gameContainer.addChild(display);
            }
            if (entity instanceof Randos) {
                var randoLevelText = new createjs.Text("lvl " + entity.level, "8pt Arial", "white");
                var randoLevelBox = new createjs.Shape();
                randoLevelBox.graphics.beginFill("black").drawRoundRect(tX - 2, tY - 15, 26, 12, 3);
                randoLevelText.textAlign = "left";
                randoLevelText.x = tX;
                randoLevelText.y = tY - 15;
                gameContainer.addChild(randoLevelBox);
                gameContainer.addChild(randoLevelText);
            }
        }
    });

    benchmark("d:minimap", function() {
        //if (isMinimapReady) {
            var minimap = getMinimapDisplay();
            minimap.setTransform(stage.canvas.width - minimap.getBounds().width - 10, 10);
            gameContainer.addChild(minimap);
        //}
    });

    var hudbar = getHudbarDisplay();
    hudbar.setTransform(10, 10);
    gameContainer.addChild(hudbar);

    benchmark("d:update", function() {
        stage.update();
    });

    benchmark("debug", function() {
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

            //overlayStr += LBREAK;
            //overlayStr += "character: " + player.characters[currentCharacter];

            if (player.isNoCollide) {
                overlayStr += LBREAK;
                overlayStr += "no collision"
            }
            $("#debugBox").html(overlayStr);
            $("#debugBox").removeClass("hidden");
        } else {
            $("#debugBox").addClass("hidden");
        }
    });
}

function getBitmap(tid) {
    if (typeof tiles[tid] !== 'undefined') {
        return tiles[tid].bitmap;
    }
    return tiles[1].bitmap; //TODO hardcode a little less
}

// MINIMAP SETTINGS
// minimap colors for tiles [r, g, b]
// note: array shouldn't be accessed directly, use getMinimapColor() instead
var minimapColors = [
    [63, 191, 63], // grass
    [191, 63, 63] // brick
]

var minimapCrosshairColor = [0, 0, 128]; // color for crosshair [r, g, b]
var minimapOpacity = 255; // how visible is minimap? (0-255)

var minimapWidth = 48; // width of minimap (in tiles)
var minimapHeight = 48; // height of minimap (in tiles)
var minimapTileSize = 2; // size of tiles on minimap (in px)

var minimapBitmap;

/**
 * Gets a DisplayObject representing the minimap
 * pixel drawing technique based on http://community.createjs.com/discussions/easeljs/1291-bitmap-pixel-manipulation
 */
function getMinimapDisplay() {
    //if (isMinimapReady) {
        var layerData = mapData.layers[0];
        var miniD = minimapTileSize;

        var minimapWidthPx = minimapWidth * minimapTileSize;
        var minimapHeightPx = minimapHeight * minimapTileSize;

        var miniCordX = ((player.x / TILE_D) | 0);
        var miniCordY = ((player.y / TILE_D) | 0);

        minimapBitmap.sourceRect = new createjs.Rectangle(
            (miniCordX * minimapTileSize - minimapWidth), (miniCordY * minimapTileSize - minimapWidth),
            minimapWidthPx,
            minimapHeightPx
        );
        return minimapBitmap;
    //}
}


//var isMinimapReady;

function initMinimap() {
    /*var num_threads = 2;
    var MT = new Multithread(num_threads);
    isMinimapReady = false;
    var task = MT.process(renderMinimap, function(){
        console.log("Loading map async.");
    });
    task();*/
	//isMinimapReady = true;
    renderMinimap();
}


/*function executeAsync(func) {
    setTimeout(func, 0);
}*/

/*initMinimap(function() {
    
});*/

/**
 * Pre-renders minimap
 */
function renderMinimap() {
    var layerData = mapData.layers[0];
    var miniD = minimapTileSize;

    var canvas = document.createElement("canvas");
    canvas.width = mapData.width * miniD;
    canvas.height = mapData.height * miniD;
    var ctx = canvas.getContext("2d");
    var id = ctx.createImageData(miniD, miniD);
    var data = id.data;

    for (var iy = 0; iy < mapData.height; iy++) {
        for (var ix = 0; ix < mapData.width; ix++) {

            var idx = ix + iy * layerData.width;
            var tid = layerData.data[idx] - 1;
            var color = getMinimapColor(tid);

            for (var i = 0; i < data.length; i += 4) {
                data[i] = color[0];
                data[i + 1] = color[1];
                data[i + 2] = color[2];
                data[i + 3] = minimapOpacity;
            }
            ctx.putImageData(id, ix * miniD, iy * miniD);
        }
    }
    minimapBitmap = new createjs.Bitmap(canvas);
    //isMinimapReady = true;
}

/**
 * Gets the color for a particular tile, or black if tile doesn't exist
 * Color given as an array [r, g, b, a]
 */
function getMinimapColor(tid) {
	try{
		if (!isWhiteListed2(tid+1)){
			return minimapColors[1];
		}else{
			return minimapColors[0];
		}
	}catch (err){
	
	}
    return [0, 0, 0, 255];
}

function isWhiteListed2(num) {
    var list = [3, 4, 7, 9, 10, 11, 12, 14, 42, 43, 45, 48, 44, 46, 47, 49, 50, 51, 52, 58, 59, 60, 61, 62, 66, 67, 68, 69, 70, 71, 72, 82, 83, 85, 86, 88, 89, 91, 92, 93];

    for (var i = 0; i < list.length; i++) {
        if (list[i] == num) {
            return true;
        }
    }
    return false;
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

var hudbarVerticalPadding = 2; // padding between each hudbar

var hudbarTextPadding = 4; // padding between text and hudbar
var hudbarTextStyle = "20px Arial"; // font for hudbar stuff

// stores last tick's hudbar
var lastHudbar;
var lastHealthPct = -1;
var lastTempPct = -1;
var lastExpPct = -1;

// HEALTHBAR SETTINGS
var healthbarColorFill = "#2fff00"; //"#e00"; // color of available health
var healthbarColorEmpty = "#ff0000"; //"#aaa"; // color of missing health
var healthbarColorBorder = "#222"; // color of hudbar border
var healthbarIconPath = "img/sprites/heart8_24.png"; // square of size hudbarIconSize

var healthbarGraphics, healthbarIcon;
var healthTxt;

// TEMPERATURE SETTINGS
var tempbarColorFill = "#5dd0e4"; // color of available temp
var tempbarColorEmpty = "#ff0000"; // color of missing temp
var tempbarColorBorder = "#222"; // color of hudbar border
var tempbarIconPath = "img/sprites/snowflake_24.png"; // square of size hudbarIconSize

var tempbarGraphics, tempbarIcon;
var temperatureTxt;

// EXPERIENCE SETTINGS
var expbarColorFill = "#ffa500"; // color of available exp
var expbarColorEmpty = "#ff0000"; // color of missing exp
var expbarColorBorder = "#222"; // color of hudbar border
var expbarIconPath = "img/sprites/exp_24.png"; // square of size hudbarIconSize

var expbarGraphics, expbarIcon;
var expTxt;

/**
 * Gets a DisplayObject representing the hudbars like health and stuff
 */
function getHudbarDisplay() {

    var healthPct = player.health / player.maxHealth; // fraction representing player health
    var tempPct = player.temp / 50;
    var expPct = player.experience / 100;

    // don't rebuild the image if nothing's changed
    if (healthPct == lastHealthPct && tempPct == lastTempPct && expPct == lastExpPct) {
        return lastHudbar;
    }
    lastHealthPct = healthPct;
    lastTempPct = tempPct;
    lastExpPct = expPct;

    // create images
    var hudbar = new createjs.Container();
    var healthbar = new createjs.Shape(healthbarGraphics.clone());
    var tempbar = new createjs.Shape(tempbarGraphics.clone());
    var expbar = new createjs.Shape(expbarGraphics.clone());

    // add health bar icon to hudbar
    hudbar.addChild(healthbarIcon);

    // add temperature bar icon to hudbar
    tempbarIcon.y = hudbarIconSize + hudbarVerticalPadding;
    hudbar.addChild(tempbarIcon);

    // add experience bar icon to hudbar
    expbarIcon.y = 2 * (hudbarIconSize + hudbarVerticalPadding);
    hudbar.addChild(expbarIcon);

    // draw filled section of healthbar
    healthbar.graphics.f(healthbarColorFill);
    healthbar.graphics.r(
        hudbarBorder, hudbarBorder,
        Math.floor(hudbarInnerWidth * healthPct),
        hudbarInnerHeight
    );

    // draw filled section of tempbar
    tempbar.graphics.f(tempbarColorFill);
    tempbar.graphics.r(
        hudbarBorder, hudbarBorder,
        Math.floor(hudbarInnerWidth * tempPct),
        hudbarInnerHeight
    );

    // draw filled section of expbar
    expbar.graphics.f(expbarColorFill);
    expbar.graphics.r(
        hudbarBorder, hudbarBorder,
        Math.floor(hudbarInnerWidth * expPct),
        hudbarInnerHeight
    );

    // add health bar to hudbar
    healthbar.setTransform(hudbarIconSize + hudbarIconPadding, 0);
    hudbar.addChild(healthbar);

    // add temperature bar to hudbar
    tempbar.setTransform(hudbarIconSize + hudbarIconPadding, hudbarHeight + hudbarVerticalPadding);
    hudbar.addChild(tempbar);

    // add experience bar to hudbar
    expbar.setTransform(hudbarIconSize + hudbarIconPadding, 2 * (hudbarHeight + hudbarVerticalPadding));
    hudbar.addChild(expbar);

    var textX = hudbarIconSize + hudbarIconPadding + hudbarWidth + hudbarTextPadding;

    var healthBack =  new createjs.Shape();
    var tempBack =  new createjs.Shape();
    var expBack =  new createjs.Shape();

    healthTxt = new createjs.Text("0", hudbarTextStyle, healthbarColorFill);
    healthTxt.x = textX;
    healthTxt.y = 0;
    healthBack.graphics.beginFill("black").drawRect(textX - 3, 0, 100, 22);
    hudbar.addChild(healthBack);
    hudbar.addChild(healthTxt);

    temperatureTxt = new createjs.Text("0˚", hudbarTextStyle, tempbarColorFill);
    temperatureTxt.x = textX;
    temperatureTxt.y = hudbarHeight + hudbarVerticalPadding;
    tempBack.graphics.beginFill("black").drawRect(textX - 3, temperatureTxt.y, 100, 22);
    hudbar.addChild(tempBack);
    hudbar.addChild(temperatureTxt);

    expTxt = new createjs.Text(expPct * 100 + " exp", hudbarTextStyle, expbarColorFill);
    expTxt.x = textX;
    expTxt.y = 2 * (hudbarHeight + hudbarVerticalPadding);
    expBack.graphics.beginFill("black").drawRect(textX - 3, expTxt.y, 100, 22);
    hudbar.addChild(expBack);
    hudbar.addChild(expTxt);

    updateBarText();

    lastHudbar = hudbar;
    return hudbar;
}

function updateBarText() {
    healthTxt.text = player.health.toString() + " / " + player.maxHealth.toString();
    // if (player.totalMoved % 500 == 0) {
    //     console.log("Updated Weather");
    //     jQuery(document).ready(function($) {
    //         $.ajax({
    //             url: "http://api.openweathermap.org/data/2.5/find?q=Rochester&units=imperial",
    //             dataType: "json",
    //             success: function(json) {
    //                 player.temp = json.list[3].main.temp;
    //             }
    //         });
    //     });
    // }
    temperatureTxt.text = player.temp + "˚";
    expTxt = player.experience;
}

/**
 * Prepares hudbars for first draw
 */
function initHudbar() {
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

    tempbarGraphics = new createjs.Graphics();

    // draw border of temp bar
    tempbarGraphics.f(tempbarColorBorder);
    tempbarGraphics.r(
        0, 0,
        hudbarWidth,
        hudbarHeight
    );

    // draw background of temp bar
    tempbarGraphics.f(tempbarColorEmpty);
    tempbarGraphics.r(
        hudbarBorder, hudbarBorder,
        hudbarInnerWidth,
        hudbarInnerHeight
    );

    tempbarIcon = new createjs.Bitmap(tempbarIconPath);

    expbarGraphics = new createjs.Graphics();

    // draw border of exp bar
    expbarGraphics.f(expbarColorBorder);
    expbarGraphics.r(
        0, 0,
        hudbarWidth,
        hudbarHeight
    );

    // draw background of exp bar
    expbarGraphics.f(expbarColorEmpty);
    expbarGraphics.r(
        hudbarBorder, hudbarBorder,
        hudbarInnerWidth,
        hudbarInnerHeight
    );

    expbarIcon = new createjs.Bitmap(expbarIconPath);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
