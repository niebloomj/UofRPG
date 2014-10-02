
var stage = new createjs.Stage("gameCanvas");
var circle = new createjs.Shape();

function init() {
  circle.graphics.beginFill("red").drawCircle(0, 0, 50);
  circle.y = 50;
  stage.addChild(circle);
  
  createjs.Ticker.on("tick", tick);
  createjs.Ticker.setFPS(60);
}
		
function tick(event) {
  circle.x += event.delta/1000*200;
  if (circle.x > stage.canvas.width) { circle.x = 0; }
  stage.update(event); // important!!
}

init();