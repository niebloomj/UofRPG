var inMotion = false,
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
				inMotion = true;
				for (i = 0; i < timeToMove; i += timeToMove / dist) {
					setTimeout(function() {
						createMap(playerX, playerY, 0, i / dist);
						playerY--;
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
						createMap(playerX, playerY, 0, -i / dist);
						playerY++;
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
						createMap(playerX, playerY, i / dist, 0);
						playerX--;
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
						createMap(playerX, playerY, -i / dist, 0);
						playerX++;
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
}
