function Enemy(name, level, maxHealth, strength, intelligence, defense) {
	this.name = name;
	this.level = level;
	this.maxHealth = maxHealth;
	this.currHealth = maxHealth;
	this.strength = strength;
	this.intelligence = intelligence;
	this.defense = defense;
}

Enemy.prototype.strength = function() {
	if (randomInt(0,100) > 25) {
		Player.health -= this.strength - Player.defense;
	}
}

Enemy.prototype.defend = function() {
	this.defense += (this.defense / 2);
}

Enemy.prototype.heal = function(amt) {
	if (this.health + amt > this.maxHealth) {
		this.health = this.maxHealth;
	} else {
		this.health += amt;
	}
}

Enemy.prototype.damage = function(amt) {
	if (this.health - amt < 0) {
		this.health = 0;
	} else {
		this.health -= amt;
	}
}

Enemy.prototype.castSpell = function(spellName, spellDamage) {
	
}