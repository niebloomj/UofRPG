
var KEYCODE_LEFT = 37,
	KEYCODE_RIGHT = 39,
	KEYCODE_UP = 38,
	KEYCODE_DOWN = 40,
	inMotion = false,
	playerX = 100,
	playerY = 100;

function createGame() {
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	console.log("we good?");
	createMap(playerX, playerY, 0, 0);
	console.log("we gucci");

	var circle = new createjs.Shape();
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
		var i,
			dist = 32,
			timeToMove = 192;

		if (!inMotion) {
			switch (event.keyCode) {
				case KEYCODE_UP:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.y -= 1;
							stage.update();
						}, i);
					}

					setTimeout(function() {
						inMotion = false;
					}, timeToMove);
					break;
				case KEYCODE_DOWN:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.y += 1;
							stage.update();
						}, i);
					}

					setTimeout(function() {
						inMotion = false;
					}, timeToMove);
					break;
				case KEYCODE_LEFT:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.x -= 1;
							stage.update();
						}, i);
					}

					setTimeout(function() {
						inMotion = false;
					}, timeToMove);
					break;
				case KEYCODE_RIGHT:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.x += 1;

							stage.update();
						}, i);
					}

					setTimeout(function() {
						inMotion = false;
					}, timeToMove);
					break;
			}
		}
		stage.update();
	});
}
