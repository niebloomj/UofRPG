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
	var A = player;
	var B = this;
	
	//console.log(rect1.x + " " + rect1.y + " " + rect1.trueWidth + " " + rect1.trueHeight);
	
	/*if (rect1.x >= rect2.x + rect2.trueWidth || rect1.x + rect1.trueWidth <= rect2.x || rect1.y >= rect2.y + rect2.trueHeight || rect1.y + rect1.trueHeight <= rect2.y ){
		return false;
	}
    return true;*/
	
	/*var xOverlap = (valueInRange(A.x, B.x, B.x + B.trueWidth) || valueInRange(B.x, A.x, A.x + A.trueWidth));

    var yOverlap = (valueInRange(A.y, B.y, B.y + B.trueHeight) || valueInRange(B.y, A.y, A.y + A.trueHeight));

    return (xOverlap && yOverlap);*/
	
	/*if (((A.x >= B.x) && (A.x <= (B.x + B.trueWidth))) || ((A.x <= B.x) && ((A.x + A.trueWidth) >= B.x))){ // Check x zone
		console.log("YAYO");
		
	}*/
	//console.log("A.x: " + A.x + " A.trueWidth: " + A.trueWidth + " B.x: " + B.x + " B.trueWidth: " + B.localWidth);
	
	if (((B.x >= A.x) && (B.x <= (A.x+A.trueWidth)))   ||  ((B.x <= A.x) && ((B.x+(32+16))>=(A.x+A.trueWidth)))){ // check x direction
		//if ((B.y >= A.y) && (B.y <= (A.y+A.trueHeight)) || ((B.y <= A.y)
		
		//((B.y >= A.y) && (B.y <= (A.y+A.trueHeight)))   ||  
		//console.log("B.y: " + B.y + " A.y: " + A.y + " B.localHeight: " + B.localHeight);
		if (((B.y >= A.y) && (B.y <= (A.y+A.trueHeight+16))) || ((B.y <= A.y) && ((B.y+16)>=(A.y)))){//((B.y+(32))>=(A.y+A.trueHeight)))){ // check y direction
			return true;
		}	
	}
	if ((B.x <= A.x) && ((B.x+32)>=(A.x+A.trueWidth))){
		//console.log("boom.");
	}
	return false;
	
	//xreturn false;

    //return false;
};

function valueInRange(value, min, max){
	return ((value >= min) && (value <= max)); 
}

