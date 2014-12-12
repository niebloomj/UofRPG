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
    this.roll();
    if (this.rng > 33) { // 1/3 chance of a "super heal"
        this.heal(Math.floor(this.maxHealth * .2));
        return "heal " + (Math.floor(this.maxHealth * .2));
    } else {
        this.heal(Math.floor(this.maxHealth * .1));
        return "heal " + (Math.floor(this.maxHealth * .1));
    }
};

Enemy.prototype.castSpell = function(spellName, spellDamage) {};

var rng;
Enemy.prototype.roll = function() {
    this.rng = Math.floor((Math.random() * 100) + 0);
}