/*
    STATS:
    Health:     120% of standard
    Strength:   80% of standard
    Defense:    80% of standard
*/

function Naropa(level) {
    this.level = level;
    this.maxHealth = Math.floor(stdBaseHealth * 1.2) + Math.floor(stdHealthGrowth * 1.2) * level;
    this.strength = Math.floor(stdBaseStrength * .8) + Math.floor(stdStrengthGrowth * .8) * level;
    this.defense = Math.floor(stdBaseDefense * .8) + Math.floor(stdDefenseGrowth * .8) * level;
};

Naropa.prototype = new Enemy("Naropa", this.level, this.maxHealth, this.strength, 10, this.defense);

Naropa.prototype.decide = function() {
    if (this.health / this.maxHealth > .75) {
        return this.attack();
    } else if (this.health / this.maxHealth > .50) {
        this.roll();
        if (this.rng > 80) {
            return this.attack();
        } else {
            return this.healSelf();
        }
    } else if (this.health / this.maxHealth > .25) {
        this.roll();
        if (this.rng > 60) {
            return this.attack();
        } else {
            return this.healSelf();
        }
    } else {
        this.roll();
        if (this.rng >= 70) {
            return this.castspell(); //Desperation attack!!
        } else if (this.rng > 30) {
            return this.attack();
        } else {
            return this.healSelf();
        }
    }
};

Naropa.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + this.strength);
        } else {
            //Naropa misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 50) {
            return ("attack " + (this.strength * 1.5));
        } else {
            //Naropa misses :(
            return "attack 0";
        }
    }
};

Naropa.prototype.castspell = function() {
    this.roll();
    if (this.rng > 75) {
        return "spell " + (this.strength);
    } else {
        //rando's spell fails
        return "spell 0";
    }
};