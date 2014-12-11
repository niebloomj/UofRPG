/*
    STATS:
    Health:     100% of standard
    Strength:   100% of standard
    Defense:    100% of standard
*/

function Hayden(level) {
    this.level = level;
    this.maxHealth = Math.floor(stdBaseHealth * 1) + Math.floor(stdHealthGrowth * 1) * level;
    this.strength = Math.floor(stdBaseStrength * 1) + Math.floor(stdStrengthGrowth * 1) * level;
    this.defense = Math.floor(stdBaseDefense * 1) + Math.floor(stdDefenseGrowth * 1) * level;
};

Hayden.prototype = new Enemy("Hayden", this.level, this.maxHealth, this.strength, 10, this.defense);

Hayden.prototype.decide = function() {
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

Hayden.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + 10);
        } else {
            //Hayden misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 50) {
            return ("attack " + (10 * 1.5));
        } else {
            //Hayden misses :(
            return "attack 0";
        }
    }
};

Hayden.prototype.castspell = function() {
    this.roll();
    if (this.rng > 75) {
        return "spell 25";
    } else {
        //rando's spell fails
        return "spell 0";
    }
};