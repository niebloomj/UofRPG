var x,
    y,
    width,
    height;

function Collider(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
}
/*
 * Note: assumes entity is 32 x 32 and provides return from collision with PLAYER. (can modify if needed for entity x entity collisions
 */
Collider.prototype.contains = function(coll) {
    var playerGapX = (player.x - 16);
    var playerGapY = (player.y - 48);
    var thisGapX = (this.x + 32);
    var thisGapY = (this.y + (48 + 32 - 2)); // note minus 2 is because there are missing pixels on top of chars

    //console.log("PlayerX: " + player.x + " This.x: " + this.x + " ThisGapX: " + thisGapX + " playerGapX: " + playerGapX);
    //console.log("PlayerY: " + player.y + " This.y: " + this.y + " ThisGapY: " + thisGapY + " playerGapY: " + playerGapY);

	/*
    // main check
    if (((player.x >= this.x) && (thisGapX >= player.x)) && ((player.y >= this.y) && (thisGapY >= player.y))){ // check if in same x zone
        return true;
    }

    // check player gap zones
    if (((this.x >= player.x) && (this.x <= playerGapX)) && (((this.y >= player.y) && (this.y <= playerGapY)) || ((this.y >= player.y) && (this.y <= playerGapY - 48)))){
        return true;
    }
    if (((this.y >= player.y) && (this.y <= playerGapY))){
        return true;
    }
    if (((this.y >= player.y) && (this.y <= playerGapY))){
        return true;
    }
    if (((player.x >= this.x) && (thisGapX >= player.x)) && ((player.y >= this.y) && (thisGapY >= player.y))){ // check if in same x zone
        return true;
    }

    // cleanup check
    if (((player.x >= this.x) && (thisGapX >= player.x)) && ((this.y <= playerGapY) && (this.gapY >= player.Y))){
        return true;
    }*/
	
	var xDist = player.x - this.x;
	var yDist = player.y - this.y;
	var distance = Math.sqrt(xDist*xDist + yDist*yDist);
	
	var playerGapX = (player.x - 16);
    var playerGapY = (player.y - 48);
    var thisGapX = (this.x + 32);
    var thisGapY = (this.y + (48 + 32 - 2));
	
	//player.setBounds(player.x,player.y,16,48);
	//this.setBounds(this.x, this.y, 32, 32);
	var rect1 = player;
	var rect2 = this;
	
	if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ){
		return true;
	}
    return false;
	//xreturn false;

    //return false;
};
