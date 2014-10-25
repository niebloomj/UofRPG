var KEYCODE_LEFT = 37,
	KEYCODE_RIGHT = 39,
	KEYCODE_UP = 38,
	KEYCODE_DOWN = 40;

function createGame() {
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	// createMap();

	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);

	var label = new createjs.Text("Arrow Keys", "bold 14px Arial", "#FFFFFF");
	label.textAlign = "center";
	label.y = -7;

	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.addChild(circle, label);
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
			dist = 20,
			timeToMove = 200,
			inMotion = false;
			
		if (!inMotion) {	
			switch (event.keyCode) {
				case KEYCODE_UP:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.y -= 1;
							label.y -= 1;
							stage.update();
						}, i);
						
						setTimeout(function() {
							inMotion = false;
						}, timeToMove)
					}
					break;
				case KEYCODE_DOWN:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.y += 1;
							label.y += 1;
							stage.update();
						}, i);
						
						setTimeout(function() {
							inMotion = false;
						}, timeToMove)
					}
					break;
				case KEYCODE_LEFT:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.x -= 1;
							label.x -= 1;
							stage.update();
						}, i);
						
						setTimeout(function() {
							inMotion = false;
						}, timeToMove)
					}
					break;
				case KEYCODE_RIGHT:
					inMotion = true;
					for (i = 0; i < timeToMove; i += timeToMove / dist) {
						setTimeout(function() {
							circle.x += 1;
							label.x += 1;
							stage.update();
						}, i);
						
						setTimeout(function() {
							inMotion = false;
						}, timeToMove)
					}
					break;
				}
			}
		}
	stage.update();
	});
}
