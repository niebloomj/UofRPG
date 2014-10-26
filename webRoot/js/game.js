var inMotion = false,
	playerX = 100,
	playerY = 100,
	circle;

function createGame() {
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	createMap(playerX, playerY, 0, 0);

	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(496, 240, 16);
	gameContainer.addChild(circle);
	stage.addChild(gameContainer);
	stage.update();

	document.addEventListener("keydown", function(event) {
		keydown(event);
	});
}
