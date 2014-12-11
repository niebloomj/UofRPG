var stdBaseHealth = 50;
var stdHealthGrowth = 10;
var stdBaseStrength = 10;
var stdStrengthGrowth = 3;
var stdBaseDefense = 5;
var stdDefenseGrowth = 1;

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

Enemy.prototype.healSelf = function() {
    if (Math.floor((Math.random() * 3) + 1) == 2) { // 1/3 chance of a "super heal"
        this.heal(Math.floor(this.maxHealth * .2));
        return "heal 10";
    } else {
        this.heal(Math.floor(this.maxHealth * .1));
        return "heal 5";
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

var rng;
Enemy.prototype.roll = function() {
    this.rng = Math.floor((Math.random() * 100) + 0);
}