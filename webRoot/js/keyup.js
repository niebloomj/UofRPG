function keyup(event) {
    player.isSprinting = event.shiftKey;
    player.isNoCollide = event.ctrlKey;
    switch (event.keyCode) {
        case KEYCODE_UP:
            player.isMoveU = false;
            break;
        case KEYCODE_DOWN:
            player.isMoveD = false;
            break;
        case KEYCODE_LEFT:
            player.isMoveL = false;
            break;
        case KEYCODE_RIGHT:
            player.isMoveR = false;
            break;
        case KEYCODE_DEBUG:
            debugMode = !debugMode;
            break;
    }
}
