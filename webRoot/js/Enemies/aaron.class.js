/*
    STATS:
    Health:     80% of standard
    Strength:   120% of standard
    Defense:    100% of standard
*/

function Aaron(level) {
    this.level = level;
    this.maxHealth = Math.floor(stdBaseHealth * .8) + Math.floor(stdHealthGrowth * .8) * level;
    this.strength = Math.floor(stdBaseStrength * 1.2) + Math.floor(stdStrengthGrowth * 1.2) * level;
    this.defense = Math.floor(stdBaseDefense * 1) + Math.floor(stdDefenseGrowth * 1) * level;
};

Aaron.prototype = new Enemy("Aaron", this.level, this.maxHealth, this.strength, 10, this.defense);

Aaron.prototype.decide = function() {
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

Aaron.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + (this.strength));
        } else {
            //Rando misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 50) {
            return ("attack " + (this.strength * 1.5));
        } else {
            //Rando misses :(
            return "attack 0";
        }
    }
};

Aaron.prototype.castspell = function() {
    this.roll();
    if (this.rng > 75) {
        return "spell " + (this.strength * 2);
    } else {
        //rando's spell fails
        return "spell 0";
    }
};