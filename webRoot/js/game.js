var inMotion = false,
	playerX = 100,
	playerY = 100;

var circle;

function createGame() {
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	console.log("we good?");
	createMap(playerX, playerY, 0, 0);
	console.log("we gucci");

	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(496, 240, 16);
	//480,224
	var dragger = new createjs.Container();
	dragger.x = dragger.y = 0;
	dragger.addChild(circle);
	gameContainer.addChild(dragger);

	// dragger.on("pressmove", function(evt) {
	// 	evt.currentTarget.x = evt.stageX;
	// 	evt.currentTarget.y = evt.stageY;
	// 	stage.update();
	// });

	stage.addChild(gameContainer);
	stage.update();

	document.addEventListener("keydown", function(event) {
		keydown(event);
	});
}
