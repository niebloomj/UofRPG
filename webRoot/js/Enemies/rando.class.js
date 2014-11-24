Rando.prototype = new Enemy("Rando", 1, 25, 20, 10, 5);

Rando.prototype.decide = function() {
	if (this.health / this.maxHealth > .75) {
		this.roll();
		if (this.rng > 80) {
			this.attack();
		} else {
			this.defend();
		}
	} else if (this.health / this.maxHealth > .50) {
		this.roll();
		if (this.rng > 70) {
			this.attack();
		} else {
			this.defend();
		}
	} else if (this.health / this.maxHealth > .25) {
		this.roll();
		if (this.rng > 60) {
			this.attack();
		} else if (this.rng > 30) {
			this.defend();
		} else {
			this.healSelf();
		}
	} else {
		this.roll();
		if (this.rng > 90) {
			this.castspell(); //Desperation attack!!
		} else if (this.rng > 70) {
			this.attack();
		} else if (this.rng > 40) {
			this.defend();
		} else {
			this.healSelf();
		}
	}
};

Rando.prototype.healSelf = function() {
	this.heal(10);
};

Rando.prototype.attack = function() {
	this.roll();
	if (this.rng > 25) {
		player.takeDamage(this.strength);
	} else {
		//Rando misses :(
	}
};

Rando.prototype.defend = function() {
	this.defense += this.defense / 2; //Randos are pretty good at defending. Who knew?
};

Rando.prototype.castspell = function() {
	this.roll();
	if (this.rng > 75) {
		player.takeDamage(25);
	} else {
		//rando's spell fails
	}
};