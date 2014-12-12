var x,
    y,
    localWidth,
    localHeight;

function Collider(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.localWidth = width;
    this.localHeight = height;
}
    /*
     * Note: assumes entity is 32 x 32 and provides return from collision with PLAYER. (can modify if needed for entity x entity collisions
     */
Collider.prototype.contains = function(coll) {
    var xDist = player.x - this.x;
    var yDist = player.y - this.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    var playerGapX = (player.x - 16);
    var playerGapY = (player.y - 48);
    var thisGapX = (this.x + 32);
    var thisGapY = (this.y + (48 + 32 - 2));

    var A = player;
    var B = this;

    if (((B.x >= A.x) && (B.x <= (A.x + A.width))) || ((B.x <= A.x) && ((B.x + (32 + 16)) >= (A.x + A.width)))) { // check x direction
        if (((B.y >= A.y) && (B.y <= (A.y + A.height + 16))) || ((B.y <= A.y) && ((B.y + 16) >= (A.y)))) { // check y direction
            return true;
        }
    }
    return false;
};

function valueInRange(value, min, max) {
    return ((value >= min) && (value <= max));
}

// Note: 1,1 Tile is 32,32 coord
function coordToTile(val) {
    return Math.floor(val / 32);
}
