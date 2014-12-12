/*
    STATS:
    Health:     60% of standard
    Strength:   160% of standard
    Defense:    40% of standard
*/

function Alex(level) {
    this.level = level;
    this.maxHealth = Math.floor(stdBaseHealth * .6) + Math.floor(stdHealthGrowth * .6) * level;
    this.strength = Math.floor(stdBaseStrength * 1.6) + Math.floor(stdStrengthGrowth * 1.6) * level;
    this.defense = Math.floor(stdBaseDefense * .4) + Math.floor(stdDefenseGrowth * .4) * level;
};

Alex.prototype = new Enemy("Alex", this.level, this.maxHealth, this.strength, 10, this.defense);

Alex.prototype.decide = function() {
    if (player.health / player.maxHealth > .75) {
        return this.attack();
    } else if (player.health / player.maxHealth > .50) {
        this.roll();
        if (this.rng > 90) {
            return this.attack();
        } else {
            return this.healSelf();
        }
    } else if (player.health / player.maxHealth > .25) {
        this.roll();
        if (this.rng > 75) {
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
        }
    }
};

Alex.prototype.attack = function() {
    this.roll();
    if (this.rng > 30) {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + this.strength);
        } else {
            //Alex misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > 25) {
            return ("attack " + (this.strength * 1.5));
        } else {
            //Alex misses :(
            return "attack 0";
        }
    }
};

Alex.prototype.castspell = function() {
    this.roll();
    if (this.rng > 50) {
        return "spell " + (this.strength * 2);
    } else {
        //rando's spell fails
        return "spell 0";
    }
};