function Enemy(name, level, maxHealth, strength, intelligence, defense) {
	this.name = name;
	this.level = level;
	this.maxHealth = maxHealth;
	this.currHealth = maxHealth;
	this.strength = strength;
	this.intelligence = intelligence;
	this.defense = defense;
	this.rng = randomInt(0, 100);
}

Enemy.prototype.decide = function() {};

Enemy.prototype.attack = function() {};

Enemy.prototype.defend = function() {};

Enemy.prototype.roll = function() {
	this.rng = randomInt(0, 100);
};

Enemy.prototype.heal = function(amt) {
	if (this.health + amt > this.maxHealth) {
		this.health = this.maxHealth;
	} else {
		this.health += amt;
	}
};

Enemy.prototype.takeDamage = function(amt) {
	if (amt - this.defense > 0) {
		if (this.health - (amt - this.defense) > 0) {
			this.health -= amt - this.defense;
		} else {
			this.health = 0;
			//this.die :(
		}
	} else {
		//Something about the enemy resisting the attack
	}
};

Enemy.prototype.castSpell = function() {};