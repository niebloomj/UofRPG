function createGame() {
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	var 	KEYCODE_LEFT = 37, 
		KEYCODE_RIGHT = 39,
		KEYCODE_UP = 38, 
		KEYCODE_DOWN = 40;

	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);

	var label = new createjs.Text("Drag it!!", "bold 14px Arial", "#FFFFFF");
	label.textAlign = "center";
	label.y = -7;

	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.addChild(circle, label);
	gameContainer.addChild(dragger);

//	dragger.on("pressmove", function(evt) {
//		evt.currentTarget.x = evt.stageX;
//		evt.currentTarget.y = evt.stageY;
//		stage.update();
//	});

	stage.addChild(gameContainer);
	stage.update();
	
	document.addEventListener("keydown", function(event) {
		var i;
		switch (event.keyCode) {
			case KEYCODE_UP:
				for (i = 0; i < 100; i++) {
					setTimeout(function() {
						circle.y -= 1;
						label.y -= 1;
					}, 100);
					stage.update();
				}
				break;
			case KEYCODE_DOWN:
				for (i = 0; i < 100; i++) {
					setTimeout(function() {
						circle.y += 1;
						label.y += 1;
					}, 100);
					stage.update();
				}
				break;
			case KEYCODE_LEFT:
				for (i = 0; i < 100; i++) {
					setTimeout(function() {
						circle.x -= 1;
						label.x -= 1;
					}, 100);
					stage.update();
				}
				break;
			case KEYCODE_RIGHT:
				for (i = 0; i < 100; i++) {
					setTimeout(function() {
						circle.x += 1;
						label.x += 1;
					}, 100);
					stage.update();
				}
				break;
		}
		stage.update();
	});
}
