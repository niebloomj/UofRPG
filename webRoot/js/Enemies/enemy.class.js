function Enemy(name, level, maxHealth, strength, intelligence, defense) {
	this.name = name;
	this.level = level;
	this.maxHealth = maxHealth;
	this.currHealth = maxHealth;
	this.strength = strength;
	this.intelligence = intelligence;
	this.defense = defense;
}

Enemy.prototype.attack = function() {};

Enemy.prototype.defend = function() {};

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
		this.damage(amt - this.defense);
	} else {
		//Something about the enemy resisting the attack
	}
};

Enemy.prototype.castSpell = function(spellName, spellDamage) {};