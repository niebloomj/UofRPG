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
	var thisGapX = (this.x + 32);//this.width);
	var thisGapY = (this.y + (48+32-2));//32);//this.height); // note minus 2 is because there are missing pixels on top of chars
	
	//console.log("PlayerX: " + player.x + " This.x: " + this.x + " ThisGapX: " + thisGapX + " playerGapX: " + playerGapX);
	//console.log("PlayerY: " + player.y + " This.y: " + this.y + " ThisGapY: " + thisGapY + " playerGapY: " + playerGapY);
	
	// main check
	if (((player.x >= this.x) && (thisGapX >= player.x)) && ((player.y >= this.y) && (thisGapY >= player.y))){ // check if in same x zone
		return true;
	}
	
	// check player gap zones
	if (((this.x >= player.x) && (this.x <= playerGapX)) && (((this.y >= player.y) && (this.y <= playerGapY)) || ((this.y >= player.y) && (this.y <= playerGapY-48)))){
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
	if (((player.x >= this.x) && (thisGapX >= player.x)) && ((this.y <= playerGapY) && (this.gapY>= player.Y))){//((player.y >= this.y) && (thisGapY >= player.y)))
		return true;
	}
	return false;
	
	/*
	* Organization note
	* 
	* check xy 2 overlap
	*
	* check x1 w overlap
	*
	* check x2 w overlap
	*
	* check x1 h overlap
	*
	* check x2 h overlap
	*/
};