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
	//Create Player Container
	/*playerContainer = new createjs.Container();
	playerContainer.mouseMoveOutside = true;
	//Create red circle- this will be the character
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(496, 272, 16);
	//Add the red circle to the player container
	playerContainer.addChild(circle);
	stage.addChild(playerContainer);
	stage.update();*/

	/*
	//Create Map
	createMap(playerX, playerY, 0, 0);
	//Add Game Container to the Stage
	stage.addChild(gameContainer);
	stage.update();
	//Create Player Container
	playerContainer = new createjs.Container();
	playerContainer.mouseMoveOutside = true;
	//Create red circle- this will be the character
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(496, 272, 16);
	//Add the red circle to the player container
	playerContainer.addChild(circle);
	//Add the player container to the stage
	stage.addChild(playerContainer);
	stage.update();
	//Add the Keydown Listener
	*/
			
	document.addEventListener("keydown", function(event) {
		//console.log("down");
		//event.preventDefault();
			
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
		//console.log("up");
		//event.preventDefault();
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
			//console.log("naropa has");
				//console.log("SWAG");
				playerX+=deltaX;
				playerY+=deltaY;
				//createMap(playerX,playerY,0,0);
				createMap(playerX,playerY);
			
		}

