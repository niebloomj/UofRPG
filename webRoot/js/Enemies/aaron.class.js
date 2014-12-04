//var Rando = function(){};
function Aaron(level) {
    this.level = level;
    this.maxHealth = 50 + level * 10;
    this.strength = 10 + level * 3;
    this.defense = 5 + level;
};

Aaron.prototype = new Enemy("Aaron", this.level, this.maxHealth, this.strength, 10, this.defense);

Aaron.prototype.decide = function() {
    if (this.health / this.maxHealth > .75) {
        this.roll();
        //if (this.rng > 80) {
        return this.attack();
        //} else {
        //return this.defend();
        //}
    } else if (this.health / this.maxHealth > .50) {
        this.roll();
        //if (this.rng > 70) {
        return this.attack();
        //} else {
        //return this.defend();
        //}
    } else if (this.health / this.maxHealth > .25) {
        this.roll();
        if (this.rng > 60) {
            return this.attack();
            //} else if (this.rng > 30) {
            //return this.defend();
        } else {
            return this.healSelf();
        }
    } else {
        this.roll();
        if (this.rng >= 70) {
            return this.castspell(); //Desperation attack!!
        } else if (this.rng > 30) {
            return this.attack();
            //} else if (this.rng > 40) {
            //return this.defend();
        } else {
            return this.healSelf();
        }
    }
};

Aaron.prototype.healSelf = function() {
    if (Math.floor((Math.random() * 3) + 1) == 2) { // 1/3 chance of a "super heal"
        this.heal(10);
        return "heal 10";
    } else {
        this.heal(5);
        return "heal 5";
    }
};

Aaron.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + 10);
        } else {
            //Rando misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 50) {
            return ("attack " + (10 * 1.5));
        } else {
            //Rando misses :(
            return "attack 0";
        }
    }
};

// what?
/*Rando.prototype.defend = function() {
	this.defense += this.defense / 2;
	return "defend 0"; 
};*/

Aaron.prototype.castspell = function() {
    this.roll();
    if (this.rng > 75) {
        return "spell 25";
    } else {
        //rando's spell fails
        return "spell 0";
    }
};

var rng;
Aaron.prototype.roll = function() {
    this.rng = Math.floor((Math.random() * 100) + 0);
}
