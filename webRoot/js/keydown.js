function keydown(event) {
    isSprinting = event.shiftKey;
    isNoCollide = event.ctrlKey;
    switch (event.keyCode) {
        case KEYCODE_UP:
            isMoveU = true;
            break;
        case KEYCODE_DOWN:
            isMoveD = true;
            break;
        case KEYCODE_LEFT:
            isMoveL = true;
            break;
        case KEYCODE_RIGHT:
            isMoveR = true;
            break;
        case KEYCODE_DEBUG:
            debugMode = !debugMode;
            break;
    }
}

function keyup(event) {
    isSprinting = event.shiftKey;
    isNoCollide = event.ctrlKey;
    switch (event.keyCode) {
        case KEYCODE_UP:
            isMoveU = false;
            break;
        case KEYCODE_DOWN:
            isMoveD = false;
            break;
        case KEYCODE_LEFT:
            isMoveL = false;
            break;
        case KEYCODE_RIGHT:
            isMoveR = false;
            break;
    }
}
