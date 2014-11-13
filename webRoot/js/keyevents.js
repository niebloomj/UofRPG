// key bindings
// look up key codes at 
// www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var KEYCODE_DEBUG = 192; // grave (`)
var KEYCODE_BENCHMARK = 220; // backslash (\)

var KEYCODE_LEFT = 37; // left arrow
var KEYCODE_RIGHT = 39; // right arrow
var KEYCODE_UP = 38; // up arrow
var KEYCODE_DOWN = 40; // down arrow

var KEYCODE_LEFT_ALT = 65; // A
var KEYCODE_RIGHT_ALT = 68; // D
var KEYCODE_UP_ALT = 87; // W
var KEYCODE_DOWN_ALT = 83; // S

var KEYCODE_TOGGLE_PLAYER = 80; // P

var KEYCODE_A = 65; // A
var KEYCODE_B = 66; // B
var KEYCODE_ENTER = 13; // ENTER
var KEYCODE_ESC = 27; // ESCAPE

//var queue = new Queue();

function keydown(event) {

	//queue.enqueue(event);
	//if (queue.length > 8)
	//    queue.dequeue();

	player.isSprinting = event.shiftKey;
	player.isNoCollide = event.ctrlKey;
	switch (event.keyCode) {
		case KEYCODE_UP:
		case KEYCODE_UP_ALT:
			player.isMoveU = true;
			break;
		case KEYCODE_DOWN:
		case KEYCODE_DOWN_ALT:
			player.isMoveD = true;
			break;
		case KEYCODE_LEFT:
		case KEYCODE_LEFT_ALT:
			player.isMoveL = true;
			break;
		case KEYCODE_RIGHT:
		case KEYCODE_RIGHT_ALT:
			player.isMoveR = true;
			break;
			/*case KEYCODE_ENTER:
			    var temp = queue.dequeue();
			    if (temp == KEYCODE_UP){
			        temp = queue.dequeue();
			        if (temp == KEYCODE_UP){
			            temp = queue.dequeue();
			            if (temp == KEYCODE_DOWN){
			                temp = queue.dequeue();
			                if (temp == KEYCODE_DOWN){
			                    temp = queue.dequeue();
			                    if (temp == KEYCODE_LEFT){
			                        temp = queue.dequeue();
			                        if (temp == KEYCODE_RIGHT){
			                            temp = queue.dequeue();
			                            if (temp == KEYCODE_B){
			                                temp = queue.dequeue();
			                                if (temp == KEYCODE_A){
			                                    temp = queue.dequeue();
			                                    game.konami = true;
			                                }
			                            }
			                        }
			                    }
			                }
			            }
			        }
			    }
			    break;*/
	}
}

function keyup(event) {
	player.isSprinting = event.shiftKey;
	player.isNoCollide = event.ctrlKey;
	switch (event.keyCode) {
		case KEYCODE_UP:
		case KEYCODE_UP_ALT:
			player.isMoveU = false;
			break;
		case KEYCODE_DOWN:
		case KEYCODE_DOWN_ALT:
			player.isMoveD = false;
			break;
		case KEYCODE_LEFT:
		case KEYCODE_LEFT_ALT:
			player.isMoveL = false;
			break;
		case KEYCODE_RIGHT:
		case KEYCODE_RIGHT_ALT:
			player.isMoveR = false;
			break;
		case KEYCODE_DEBUG:
			debugMode = !debugMode;
			break;
		case KEYCODE_BENCHMARK:
			benchmarkingMode = !benchmarkingMode;
			break;
		case KEYCODE_TOGGLE_PLAYER:
			if (debugMode)
				player.iterateCharacter();
			break;
	}
}
