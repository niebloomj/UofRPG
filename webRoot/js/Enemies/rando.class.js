Rando.prototype = new Enemy("Rando", 1, 100, 10, 10, 10);

Rando.prototype.attack = function() {
	if (randomInt(0, 100) > 25) {
		player.takeDamage(this.strength);
	} else {
		//Rando misses :(
	}
}

Rando.prototype.defend = function() {
	this.defense += this.defense / 2; //Randos are pretty good at defending. Who knew?
}

Rando.prototype.castspell = function(spellDamage) {
	//Randos use fireballs, by the way
	
}