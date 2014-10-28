var inMotion = false,
	playerX = 3200,
	playerY = 3200,
	deltaX = 0,
	deltaY = 0,
	circle,
	KEYCODE_LEFT = 37,
	KEYCODE_RIGHT = 39,
	KEYCODE_UP = 38,
	KEYCODE_DOWN = 40;

function createGame() {
	//Create Game Container
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	stage.addChild(gameContainer);
			
	document.addEventListener("keydown", function(event) {
		switch (event.keyCode) {
			case KEYCODE_UP:
				inMotion=true;
				deltaY=-5;
				break;
			case KEYCODE_DOWN:
				inMotion=true;
				deltaY=5;
				break;
			case KEYCODE_LEFT:
				inMotion=true;
				deltaX=-5;
				break;
			case KEYCODE_RIGHT:
				inMotion=true;
				deltaX=5;
				break;
		}
	});

	document.addEventListener("keyup", function(event) {
		switch (event.keyCode) {
			case KEYCODE_UP:
				inMotion=false;
				deltaY=0;
				break;
			case KEYCODE_DOWN:
				inMotion=false;
				deltaY=0;
				break;
			case KEYCODE_LEFT:
				inMotion=false;
				deltaX=0;
				break;
			case KEYCODE_RIGHT:
				inMotion=false;
				deltaX=0;
				break;
		}
	});

	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(30);
}
function tick(event) {
	playerX+=deltaX;
	playerY+=deltaY;
	createMap(playerX,playerY);
}