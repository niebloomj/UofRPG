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
	
	this.document.onkeydown = keyPressed;

//	var dragger = new createjs.Container();
//	dragger.x = dragger.y = 100;
//	dragger.addChild(circle, label);
//	gameContainer.addChild(dragger);

//	dragger.on("pressmove", function(evt) {
//		evt.currentTarget.x = evt.stageX;
//		evt.currentTarget.y = evt.stageY;
//		stage.update();
//	});

	stage.addChild(gameContainer);
	stage.update();
}

function keyPress(event) {
	switch (event.keycode) {
		case KEYCODE_UP {
			circle.y -= 5;
			break;
		} case KEYCODE_DOWN {
			circle.y += 5;
			break;
		} case KEYCODE_LEFT {
			circle.x -= 5;
			break;
		} case KEYCODE_RIGHT {
			circle.x += 5;
			break;
		}
	}
}
