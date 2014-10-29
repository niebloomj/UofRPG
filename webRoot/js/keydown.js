function keydown(event) {
    player.isSprinting = event.shiftKey;
    player.isNoCollide = event.ctrlKey;
    switch (event.keyCode) {
        case KEYCODE_UP:
            player.isMoveU = true;
            break;
        case KEYCODE_DOWN:
            player.isMoveD = true;
            break;
        case KEYCODE_LEFT:
            player.isMoveL = true;
            break;
        case KEYCODE_RIGHT:
            player.isMoveR = true;
            break;
    }
}
