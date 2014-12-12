/*
    STATS:
    Health:     80% of standard
    Strength:   160% of standard
    Defense:    20% of standard
*/

function Jacob(level) {
    this.level = level;
    this.maxHealth = Math.floor(stdBaseHealth * .8) + Math.floor(stdHealthGrowth * .8) * level;
    this.strength = Math.floor(stdBaseStrength * 1.6) + Math.floor(stdStrengthGrowth * 1.6) * level;
    this.defense = Math.floor(stdBaseDefense * .2) + Math.floor(stdDefenseGrowth * .2) * level;
};

Jacob.prototype = new Enemy("Jacob", this.level, this.maxHealth, this.strength, 10, this.defense);

Jacob.prototype.decide = function() {
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

Jacob.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + this.strength);
        } else {
            //Jacob misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 50) {
            return ("attack " + (this.strength * 1.5));
        } else {
            //Jacob misses :(
            return "attack 0";
        }
    }
};

Jacob.prototype.castspell = function() {
    this.roll();
    if (this.rng > 30) {
        return "spell " + (Math.floor(this.strength * 2.5));
    } else {
        //rando's spell fails
        return "spell 0";
    }
};