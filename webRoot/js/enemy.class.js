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
		if (this.strength - player.defense > 0) {
			player.takeDamage(this.strength - player.defense);
		} else {
			//message about the player resisting the attack or something
		}
	} else {
		//enemy misses
	}
};

Enemy.prototype.defend = function() {
	this.defense += (this.defense / 2);
};

Enemy.prototype.heal = function(amt) {
	if (this.health + amt > this.maxHealth) {
		this.health = this.maxHealth;
	} else {
		this.health += amt;
	}
};

Enemy.prototype.damage = function(amt) {
	if (this.health - amt < 0) {
		this.health = 0;
	} else {
		this.health -= amt;
	}
};

Enemy.prototype.takeDamage = function(amt) {
	if (amt - this.defense > 0) {
		this.health -= amt - this.defense;
	} else {
		//Something about the enemy resisting the attack
	}
};

Enemy.prototype.castSpell = function(spellName, spellDamage) {
	if (spellDamage - player.defense > 0) {
		player.takeDamage(spellDamage - player.defense);
	} else {
		//message about the player resisting the attack or something
	}
};