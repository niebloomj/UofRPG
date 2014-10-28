function keydown(event) {
    isSprinting = event.shiftKey;
    isNoCollide = event.ctrlKey;
    switch (event.keyCode) {
        case KEYCODE_UP:
            inMotion = true;
            deltaY = -1*WALK_SPEED;
            break;
        case KEYCODE_DOWN:
            inMotion = true;
            deltaY = WALK_SPEED;
            break;
        case KEYCODE_LEFT:
            inMotion = true;
            deltaX = -1*WALK_SPEED;
            break;
        case KEYCODE_RIGHT:
            inMotion = true;
            deltaX = WALK_SPEED;
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
            inMotion = false;
            deltaY = 0;
            break;
        case KEYCODE_DOWN:
            inMotion = false;
            deltaY = 0;
            break;
        case KEYCODE_LEFT:
            inMotion = false;
            deltaX = 0;
            break;
        case KEYCODE_RIGHT:
            inMotion = false;
            deltaX = 0;
            break;
    }
}
