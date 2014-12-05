//var Alex = function(){};
function Alex(level) {
    this.level = level;
    this.maxHealth = 50 + level * 10;
    this.strength = 10 + level * 3;
    this.defense = 5 + level;
};

Alex.prototype = new Enemy("Alex", this.level, this.maxHealth, this.strength, 10, this.defense);

Alex.prototype.decide = function() {
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

Alex.prototype.healSelf = function() {
    if (Math.floor((Math.random() * 3) + 1) == 2) { // 1/3 chance of a "super heal"
        this.heal(10);
        return "heal 10";
    } else {
        this.heal(5);
        return "heal 5";
    }
};

Alex.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + 10);
        } else {
            //Alex misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 50) {
            return ("attack " + (10 * 1.5));
        } else {
            //Alex misses :(
            return "attack 0";
        }
    }
};

// what?
/*Alex.prototype.defend = function() {
	this.defense += this.defense / 2;
	return "defend 0"; 
};*/

Alex.prototype.castspell = function() {
    this.roll();
    if (this.rng > 75) {
        return "spell 25";
    } else {
        //rando's spell fails
        return "spell 0";
    }
};

var rng;
Alex.prototype.roll = function() {
    this.rng = Math.floor((Math.random() * 100) + 0);
}
