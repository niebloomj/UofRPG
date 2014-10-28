var n = false,
	playerX = 100,
	playerY = 100,
	KEYCODE_LEFT = 37,
	KEYCODE_RIGHT = 39,
	KEYCODE_UP = 38,
	KEYCODE_DOWN = 40;

function keydown(event) {
	var i,
		dist = 32,
		timeToMove = 192;

	if (!inMotion) {
		switch (event.keyCode) {
			case KEYCODE_UP:
			inMotion=true;
			deltaY+=5;
				break;
			case KEYCODE_DOWN:
			inMotion=true;
			deltaY-=5;
				break;
			case KEYCODE_LEFT:
			inMotion=true;
			deltaX-=5;
				break;
			case KEYCODE_RIGHT:
			inMotion=true;
			deltaX+=5;
				break;
		}
	}
	stage.update();
}

function keyup(event){
		switch (event.keyCode) {
			case KEYCODE_UP:
			inMotion=false;
			deltaY-=5;
				break;
			case KEYCODE_DOWN:
			inMotion=false;
			deltaY+=5;
				break;
			case KEYCODE_LEFT:
			inMotion=false;
			deltaX+=5;
				break;
			case KEYCODE_RIGHT:
			inMotion=false;
			deltaX-=5;
				break;
}
