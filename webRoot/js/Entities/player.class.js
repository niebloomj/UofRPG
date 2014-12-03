function Player(name, map) {
    this.name = name;
    this.map = map;
    this.temp = 50;

    //Stats
    this.maxHealth = 100;
    this.health = 100;
    this.strength = 10;
    this.defense = 5;
    this.intelligence = 10;
    this.charisma = 5;
    this.experience = 0;
    this.money = 0;

    this.inventory = [];

    //Moving Variables
    this.isMoveU = false;
    this.isMoveD = false;
    this.isMoveL = false;
    this.isMoveR = false;
    this.isSprinting = false;
    this.isNoCollide = false;
    this.isMovingLeft = true;
    this.isMovingRight = true;
    this.isMovingDown = true;
    this.isMovingUp = true;
    this.walkSpeed = 5;
    this.sprintMultiplier = 1.5;
    this.totalMoved = 1;

    this.currentCharacter = 0;
    this.characters = [
        "img/sprites/player_santiago.png",
        "img/sprites/player_alex.png",
        "img/sprites/player_brad.png",
        "img/sprites/player_naropa.png",
        "img/sprites/player_aaron.png",
        "img/sprites/player_hayden.png",
        "img/sprites/player_jacob.png",
        "img/sprites/player_santiagoSouth.png"
    ];
}

// defines a human-controlled entity
Player.prototype = new Entity(3200, 3200, 16, 48);

Player.prototype.deltaX = function(elapsedTime) {
    var deltaX = 0;
    if (this.isMoveL) {
        deltaX -= this.walkSpeed;
        this.totalMoved += 1;
    }
    if (this.isMoveR) {
        deltaX += this.walkSpeed;
        this.totalMoved += 1;
    }
    deltaX *= (this.isSprinting ? this.sprintMultiplier : 1)
    deltaX *= elapsedTime / TARGET_FPS;
    return Math.floor(deltaX);
};

Player.prototype.deltaY = function(elapsedTime) {
    var deltaY = 0;
    if (this.isMoveU) {
        deltaY -= this.walkSpeed;
        this.totalMoved += 1;
    }
    if (this.isMoveD) {
        deltaY += this.walkSpeed;
        this.totalMoved += 1;
    }
    deltaY *= (this.isSprinting ? this.sprintMultiplier : 1)
    deltaY *= elapsedTime / TARGET_FPS;
    return Math.floor(deltaY);
};

Player.prototype.move = function(delta) {
    this.x += this.deltaX(delta);
    this.y += this.deltaY(delta);
    this.stepCheck();
};

Player.prototype.stepCheck = function() {
    if (player.totalMoved % 50 == 0) {
        if (player.totalMoved % 500 == 0) {
            if (player.temp < 50 && !player.isInInventory("jacket")) {
                if ((player.health - 5) > 0) {
                    player.setHealth(player.health - 5);
                    Messenger().post({
                        message: "You lost five health because of the cold. WEAR A JACKET",
                        type: "error",
                        hideAfter: "3"
                    })
                } else {
                    player.setHealth(0);
                }
            }
        }
        saveGame();
    }
}

Player.prototype.tick = function(delta) {
    this.move(delta);
    this.handleCollision();

    if (this.isMoveR && !(this.isMoveL)) {
        this.isMovingLeft = false;
    }
    if (this.isMoveL && !(this.isMoveR)) {
        this.isMovingLeft = true;
    }
    if (this.isMoveU && !(this.isMoveD)) {
        this.isMovingUp = true;
    }
    if (this.isMoveD && !(this.isMoveU)) {
        this.isMovingDown = false;
    }
}

Player.prototype.handleCollision = function() {

    var d = this.map.tilewidth;
    var layerData = this.map.layers[0];

    var cordX = ((this.x / d) | 0);
    var cordY = ((this.y / d) | 0);
    var modX = d - (this.x % d);
    var modY = d - (this.y % d);

    var botXRight = cordX,
        botYRight = cordY,
        topXRight = cordX,
        topYRight = cordY - 1,
        botXLeft = cordX - 1,
        botYLeft = cordY,
        topXLeft = cordX - 1,
        topYLeft = cordY - 1;

    var topLeftIndex = topXLeft + topYLeft * layerData.width;
    var botLeftIndex = botXLeft + botYLeft * layerData.width;
    var topRightIndex = topXRight + topYRight * layerData.width;
    var botRightIndex = botXRight + botYRight * layerData.width;

    var topLeftCollision = false;
    var topRightCollision = false;
    var botLeftCollision = false;
    var botRightCollision = false;
    // 48 and 49
    try {
        var v1 = layerData.data[botLeftIndex];
        // console.log("Val: " + v1);
        if (!isWhiteListed(v1)) { //(layerData.data[botLeftIndex].properties[0] == "solid")){// - 1) == 1) {
            botLeftCollision = true;
        }
    } catch (err) {}
    try {
        var v2 = layerData.data[topLeftIndex];
        if (!isWhiteListed(v2)) { //(layerData.data[botLeftIndex].properties[0] == "solid")){// - 1) == 1) {
            topLeftCollision = true;
        }
    } catch (err) {}
    try {
        var v3 = layerData.data[topRightIndex];
        if (!isWhiteListed(v3)) { //(layerData.data[botLeftIndex].properties[0] == "solid")){// - 1) == 1) {
            topRightCollision = true;
        }
    } catch (err) {}
    try {
        var v4 = layerData.data[botRightIndex];
        if (!isWhiteListed(v4)) { //(layerData.data[botLeftIndex].properties[0] == "solid")){// - 1) == 1) {
            botRightCollision = true;
        }
    } catch (err) {}

    var topCollisionHard = topLeftCollision && topRightCollision;
    var botCollisionHard = botLeftCollision && botRightCollision;
    var leftCollisionHard = topLeftCollision && botLeftCollision;
    var rightCollisionHard = topRightCollision && botRightCollision;

    var topCollision = topCollisionHard || (topLeftCollision && !leftCollisionHard) || (topRightCollision && !rightCollisionHard);
    var botCollision = botCollisionHard || (botLeftCollision && !leftCollisionHard) || (botRightCollision && !rightCollisionHard);
    var leftCollision = leftCollisionHard || (topLeftCollision && !topCollisionHard) || (botLeftCollision && !botCollisionHard);
    var rightCollision = rightCollisionHard || (topRightCollision && !topCollisionHard) || (botRightCollision && !botCollisionHard);

    if (debugMode && this.isNoCollide) {
        topCollision = false;
        botCollision = false;
        leftCollision = false;
        rightCollision = false;
    }

    if (topCollision || botCollision) {
        while (this.y % d > 0) {
            if (topCollision) {
                this.y++;
            } else {
                this.y--;
            }
        }
        cordY = ((this.y / d) | 0);
        modY = d - (this.y % d);
        topCollision = false;
        botCollision = false;
    }

    if (leftCollision || rightCollision) {
        while (this.x % d > 0) {
            if (leftCollision) {
                this.x++;
            } else {
                this.x--;
            }
        }
        cordX = ((this.x / d) | 0);
        modX = d - (this.x % d);
        leftCollision = false;
        rightCollision = false;
    }
}

function isWhiteListed(num) {
    var list = [3, 4, 7, 9, 10, 12, 14, 42, 43, 45, 48, 44, 46, 47, 49, 50, 51, 52, 58, 59, 66, 67, 68, 69, 82, 83, 85];

    for (var i = 0; i < list.length; i++) {
        if (list[i] == num) {
            return true;
        }
    }
    return false;
}

Player.prototype.iterateCharacter = function() {
    this.currentCharacter = (this.currentCharacter + 1) % this.characters.length;
}

Player.prototype.getDisplay = function() {

    var sprite = new createjs.Bitmap(this.characters[this.currentCharacter]);

    if (!(this.isMovingUp)) {
        sprite = createjs.Bitmap(this.characters[7]);
    }

    if (this.isMovingLeft) {
        sprite.setTransform(0, 0, 1); //-1 * this.height
    } else {
        sprite.setTransform(this.width, 0, -1);
    }

    var parent = new createjs.Container();
    parent.addChild(sprite)
    return parent;

};

Player.prototype.die = function() {
    player.money = Math.round((player.money * 9/10) / 10) * 10;
    player.setMoney(player.money);
    console.log(player.money);
    player.setHealth(100); // just so it isn't game over
	player.x = 60*32;
	player.y = 63*32;
    saveGame();
    setTimeout(function() {
        goBack()
    }, 250);
}

Player.prototype.takeDamage = function(amt) {
    if (amt - this.defense > 0) {
        if (this.health - amt <= 0) {
            //Player.die(); rip in peace
        } else {
            this.health -= amt;
        }
    } else {
        //something about the player resisting the attack or something
    }
};

Player.prototype.setMaxHealth = function(newMaxHealth) {
    this.maxHealth = newMaxHealth;
};

Player.prototype.setHealth = function(newHealth) {
	if (newHealth < 0){
		this.health = 0;
		Messenger().post({
           message: "You Died!!",
           type: "error",
           hideAfter: "5"
        });
        //location.reload();
	}else if (newHealth > this.maxHealth){
		this.health = this.maxHealth;
	}else{
		this.health = newHealth;
	}
};

Player.prototype.setExperience = function(newExp){
	if ((experience + newExp) >= 100){
		experience = 100;
		msg = Messenger().post({
        message: 'Congratulations you leveled up!  Pick a skill to upgrade.',
        type: 'success',
        hideAfter: false,
        actions: {
            strength: {
                label: 'Strength',
                hideAfter: false,
                action: function() {
					this.strength += 1;
                    return msg.cancel();
                }
            },
			defense: {
				label: 'Defense',
				hideAfter: false,
				action: function(){
					this.defense += 1;
					return msg.cancel();
				}
			}
		}
		});
			
	}else{
		experience += newExp;
	}
}

Player.prototype.setStrength = function(newStrength) {
    this.strength = newStrength;
};

Player.prototype.setDefense = function(newDefense) {
    this.defense = newDefense;
};

Player.prototype.setCharisma = function(newCharisma) {
    this.charisma = newCharisma;
};

Player.prototype.setIntelligence = function(newIntelligence) {
    this.intelligence = newIntelligence;
};

Player.prototype.setMoney = function(newMoney) {
    this.money = newMoney;
    $(".walletAmount").html("$" + this.money + " URos");
};


Player.prototype.addToInventory = function(item) {
    if (item.isPersistent) {
        this.inventory.push(item.id);
    }
    this.setMaxHealth(this.maxHealth + item.attributes.maxHealth);
    this.setHealth(this.health + item.attributes.health);
    this.setStrength(this.strength + item.attributes.strength);
    this.setDefense(this.defense + item.attributes.defense);
    this.setIntelligence(this.intelligence + item.attributes.intelligence);
    this.setCharisma(this.charisma + item.attributes.charisma);
};

Player.prototype.isInInventory = function(itemId) {
    for (var i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i] == itemId) {
            return true;
        }
    }
    return false;
};
