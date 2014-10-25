function init() {
	gameContainer = new createjs.Container();
	gameContainer.mouseMoveOutside = true;

	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);

	var label = new createjs.Text("Drag it!!", "bold 14px Arial", "#FFFFFF");
	label.textAlign = "center";
	label.y = -7;

	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.addChild(circle, label);
	gameContainer.addChild(dragger);

	dragger.on("pressmove", function(evt) {
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();
	});

	stage.addChild(gameContainer);
	stage.update();
}