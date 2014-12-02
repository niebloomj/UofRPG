//var Rando = function(){};
function Rando(){};

Rando.prototype = new Enemy("Rando", 1, 25, 20, 10, 5);

Rando.prototype.decide = function() {
	if (this.health / this.maxHealth > .75) {
		this.roll();
		if (this.rng > 80) {
			return this.attack();
		} else {
			return this.defend();
		}
	} else if (this.health / this.maxHealth > .50) {
		this.roll();
		if (this.rng > 70) {
			return this.attack();
		} else {
			return this.defend();
		}
	} else if (this.health / this.maxHealth > .25) {
		this.roll();
		if (this.rng > 60) {
			return this.attack();
		} else if (this.rng > 30) {
			return this.defend();
		} else {
			return this.healSelf();
		}
	} else {
		this.roll();
		if (this.rng > 90) {
			return this.castspell(); //Desperation attack!!
		} else if (this.rng > 70) {
			return this.attack();
		} else if (this.rng > 40) {
			return this.defend();
		} else {
			return this.healSelf();
		}
	}
};

Rando.prototype.healSelf = function() {
	this.heal(10);
	return "heal 10";
};

Rando.prototype.attack = function() {
	this.roll();
	if (this.rng > 30) {
		this.roll();
		if (this.rng > 25) {
			player.takeDamage(this.strength);
			return "attack " + this.strength;
		} else {
			//Rando misses :(
			return "attack 0";
		}
	} else {
		this.roll();
		if (this.rng > 50) {
			player.takeDamage(this.strength * 1.5);
			return "attack " + (this.strength*1.5);
		} else {
			//Rando misses :(
			return "attack 0";
		}
	}
};

// what?
Rando.prototype.defend = function() {
	this.defense += this.defense / 2;
	return "defend 0"; 
};

Rando.prototype.castspell = function() {
	this.roll();
	if (this.rng > 75) {
		player.takeDamage(25);
		return "spell 25";
	} else {
		//rando's spell fails
		return "spell 0";
	}
};