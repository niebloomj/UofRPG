function keydown(event) {

    switch (event.keyCode) {
        case KEYCODE_UP:
            inMotion = true;
            deltaY = -5;
            break;
        case KEYCODE_DOWN:
            inMotion = true;
            deltaY = 5;
            break;
        case KEYCODE_LEFT:
            inMotion = true;
            deltaX = -5;
            break;
        case KEYCODE_RIGHT:
            inMotion = true;
            deltaX = 5;
            break;
    }
}

function keyup(event) {
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
