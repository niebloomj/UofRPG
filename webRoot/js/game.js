var inMotion = false,
	playerX = 100,
	playerY = 100,
	circle;

function createGame() {
	//Create Game Container
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;
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
	document.addEventListener("keydown", function(event) {
		keydown(event);
	});
}
