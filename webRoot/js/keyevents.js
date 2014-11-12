// key bindings
// look up key codes at http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
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

function keydown(event) {
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
