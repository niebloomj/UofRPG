// constant for movement speed
var TARGET_FPS = 30;
var player;
var uro;
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

			/*// special case for spritesheet-based tilesets
			} else if (tileset.imageheight != tileset.tileheight || tileset.imagewidth != tileset.tilewidth) {
			    
			    var mh = tileset.imageheight;
			    var th = tileset.tileheight;
			    var mw = tileset.imagewidth;
			    var tw = tileset.tilewidth;
			    var sheet = new createjs.Bitmap(tileset.image);

			    var tilesTall = mh / th;
			    var tilesWide = mw / tw;

			    for (var i = 0; i < mh / th; i++) {
			        for (var j = 0; j < mw / tw; j++) {

			            var bmp = sheet.clone();
			            bmp.sourceRect = new createjs.Rectangle(j * tw, i * th, tw, th);

			            var tileObj = {
			                image: tileset.image,
			                bitmap: bmp
			            };

			            var index = firstgid + ((i * tilesTall) + j);
			            tiles[index] = tileObj;

			            console.log(i + "," + j + ": " + index + ", " + (j * tw) +" "+ (i * th) +" "+ tw +" "+ th);
			        }
			    }
			    */
			// case for "normal" tilesets with just one tile
		} else {
			var tileObj = {
				image: tileset.image,
				bitmap: new createjs.Bitmap(tileset.image)
			};

			tiles[firstgid] = tileObj;
		}
	}
	//console.log(tiles);

	// preps minimap to be drawn
	initMinimap();

	// create the player
	player = new Player("PlaceholderUsername", mapData);
	$("#gameHeaderNavUsername").html(username);

	// preps hudbars to be drawn
	initHudbar();

	entities = [player];

	for (var i = 0; i < 200; i++) {
		uro = new Uros(getRandInt(0, 6400), getRandInt(0, 6400));
		entities.push(uro); 
	}
	uro = new Uros(player.x+20, player.y+20); // very useful for testing
	entities.push(uro);

	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setInterval(1000 / TARGET_FPS);
	//createjs.Ticker.setFPS(60); //for the glory of GabeN!
}

function getRandInt(min, max) {
	return Math.random() * (max - min) + min;
}

var benchmarks = [];
//this.konami = false;

// NOT TO BE EXPLICITLY CALLED!!
function tick(event) {
	// tick all the entities (unless we're in combat)
	if (!noTick) {
		if (!inCombat) {
			benchmark("entities", function() {
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.tick(event.delta);
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
	} else {
		player.isMoveU = false;
		player.isMoveD = false;
		player.isMoveL = false;
		player.isMoveR = false;
	}
	benchmark("benchmark", function() {
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
