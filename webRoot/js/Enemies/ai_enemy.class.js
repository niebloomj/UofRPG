

var RANDO_AARON = ["Aaron",
    0.8, // hp multiplier
    1.2, // str multiplier
    1, // def mulitplier
    [
        {cast: 70, atk: 30}, // ai when health in 0th pctile
        {cast: 100, atk: 60}, // ai when health in 25th pctile
        {cast: 100, atk: 80}, // ai when health in 50th pctile
        {cast: 100, atk: 0} // ai when health in 75th pctile
    ],
    {
        attackCrit: 30, // odds out of 100 that he doesn't do a critical attack
        attackCritOdds: 25, // odds out of 100 that he misses a critical attack
        attackNormalOdds: 50, // odds out of 100 that he misses a non-crit attack
        castOdds: 75 // odds out of 100 that he misses a cast spell
    }
];

var RANDO_ALEX = ["Alex",
    0.6, // hp multiplier
    1.6, // str multiplier
    0.4, // def mulitplier
    [
        {cast: 70, atk: 30}, // ai when health in 0th pctile
        {cast: 100, atk: 60}, // ai when health in 25th pctile
        {cast: 100, atk: 80}, // ai when health in 50th pctile
        {cast: 100, atk: 0} // ai when health in 75th pctile
    ],
    {
        attackCrit: 30, // odds out of 100 that he doesn't do a critical attack
        attackCritOdds: 25, // odds out of 100 that he misses a critical attack
        attackNormalOdds: 50, // odds out of 100 that he misses a non-crit attack
        castOdds: 75 // odds out of 100 that he misses a cast spell
    }
];

var RANDO_BRAD = ["Brad",
    1.2, // hp multiplier
    1.1, // str multiplier
    0.8, // def mulitplier
    [
        {cast: 70, atk: 30}, // ai when health in 0th pctile
        {cast: 100, atk: 60}, // ai when health in 25th pctile
        {cast: 100, atk: 80}, // ai when health in 50th pctile
        {cast: 100, atk: 0} // ai when health in 75th pctile
    ],
    {
        attackCrit: 30, // odds out of 100 that he doesn't do a critical attack
        attackCritOdds: 25, // odds out of 100 that he misses a critical attack
        attackNormalOdds: 50, // odds out of 100 that he misses a non-crit attack
        castOdds: 75 // odds out of 100 that he misses a cast spell
    }
];

var RANDO_JACOB = ["Jacob",
    0.8, // hp multiplier
    1.6, // str multiplier
    0.2, // def mulitplier
    [
        {cast: 70, atk: 30}, // ai when health in 0th pctile
        {cast: 100, atk: 60}, // ai when health in 25th pctile
        {cast: 100, atk: 80}, // ai when health in 50th pctile
        {cast: 100, atk: 0} // ai when health in 75th pctile
    ],
    {
        attackCrit: 30, // odds out of 100 that he doesn't do a critical attack
        attackCritOdds: 25, // odds out of 100 that he misses a critical attack
        attackNormalOdds: 50, // odds out of 100 that he misses a non-crit attack
        castOdds: 75 // odds out of 100 that he misses a cast spell
    }
];

var RANDO_HAYDEN = ["Hayden",
    1.6, // hp multiplier
    0.6, // str multiplier
    1.4, // def mulitplier
    [
        {cast: 70, atk: 30}, // ai when health in 0th pctile
        {cast: 100, atk: 60}, // ai when health in 25th pctile
        {cast: 100, atk: 80}, // ai when health in 50th pctile
        {cast: 100, atk: 0} // ai when health in 75th pctile
    ],
    {
        attackCrit: 30, // odds out of 100 that he doesn't do a critical attack
        attackCritOdds: 25, // odds out of 100 that he misses a critical attack
        attackNormalOdds: 50, // odds out of 100 that he misses a non-crit attack
        castOdds: 75 // odds out of 100 that he misses a cast spell
    }
];

var RANDO_NAROPA = ["Naropa",
    1.2, // hp multiplier
    0.8, // str multiplier
    0.8, // def mulitplier
    [
        // cast: odds out of 100 that he won't cast a spell
        // atk: odds out of 100 that he won't attack
        // if he does neither of those, he heals
        {cast: 70, atk: 30}, // ai when health in 0th pctile
        {cast: 100, atk: 60}, // ai when health in 25th pctile
        {cast: 100, atk: 80}, // ai when health in 50th pctile
        {cast: 100, atk: 0} // ai when health in 75th pctile
    ],
    {
        attackCrit: 30, // odds out of 100 that he doesn't do a critical attack
        attackCritOdds: 25, // odds out of 100 that he misses a critical attack
        attackNormalOdds: 50, // odds out of 100 that he misses a non-crit attack
        castOdds: 75 // odds out of 100 that he misses a cast spell
    }
];

var RANDO_PRESETS = [RANDO_AARON, RANDO_ALEX, RANDO_BRAD, RANDO_JACOB, RANDO_HAYDEN, RANDO_NAROPA];


function AiEnemy(props, level) {/*name, level, hp, str, def, decisionAi, luck*/
    var name = props[0];
    var hp = props[1];
    var str = props[2];
    var def = props[3];
    var decisionAi = props[4];
    var luck = props[5];

    this.name = name;
    this.level = level;
    this.maxHealth = Math.floor(stdBaseHealth * hp) + Math.floor(stdHealthGrowth * hp) * level;
    this.health = this.maxHealth;
    this.strength = Math.floor(stdBaseStrength * str) + Math.floor(stdStrengthGrowth * str) * level;
    this.defense = Math.floor(stdBaseDefense * def) + Math.floor(stdDefenseGrowth * def) * level;
    this.intelligence = 10;
    this.decisionAi = decisionAi;
    this.luck = luck;
};

AiEnemy.prototype = new Enemy(this.name, this.level, this.maxHealth, this.strength, this.intelligence, this.defense);

AiEnemy.prototype.decide = function() {
    var healthPct = this.health / this.maxHealth;
    var pctIncrements = 1 / this.decisionAi.length;
    var aiIndex = Math.floor(healthPct / pctIncrements - 1);
    var ai = this.decisionAi[aiIndex];

    this.roll();
    if (this.rng > Math.max(ai.atk, ai.cast)) {
        if (ai.atk >= ai.cast)
            return this.attack();
        else
            return this.castSpell();
    } else if (this.rng > Math.min(ai.atk, ai.cast)) {
        if (ai.atk < ai.cast)
            return this.attack();
        else
            return this.castSpell();
    } else {
        return this.healSelf();
    }
};

AiEnemy.prototype.attack = function() {
    this.roll();
    if (this.rng > this.luck.attackCrit) {
        this.roll();
        if (this.rng > this.luck.attackCritOdds) {
            return ("attack " + Math.floor(this.strength));
        } else {
            //Rando misses :(
            return "attack 0";
        }
    } else {
        this.roll();
        if (this.rng > this.luck.attackNormalOdds) {
            return ("attack " + Math.floor(this.strength * 1.5));
        } else {
            //Rando misses :(
            return "attack 0";
        }
    }
};

AiEnemy.prototype.castspell = function() {
    this.roll();
    if (this.rng > this.luck.castOdds) {
        return "spell " + Math.floor(this.strength * 2);
    } else {
        //rando's spell fails
        return "spell 0";
    }
};