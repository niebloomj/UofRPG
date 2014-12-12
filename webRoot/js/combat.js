var inCombat = false;
var enmyinit;
var combatTicks = 0;
var combatShape = new createjs.Shape();
var combatEnemy = new createjs.Shape();
var healthText;
var combatBackground = new Image();
combatBackground.src = 'img/CombatTest.png';
var fightMusic = new Audio('..\/audio\/FightMusic.mp3');
var Enemy1 = new Image();
Enemy1.src = 'img/rando_large.png';

var msg;
var myRando;

var randoHealth;

function initCombat(enemyLevel, enemyType) {
    $('#storeModal').modal('hide');

    var combatSuccessful = false;
    inCombat = true;
    fightMusic.volume = fightMusic.volume * .6;
    backgroundMusic.pause();
    fightMusic.play();
    backgroundMusic = new Audio('..\/audio\/BackgroundMusic.mp3');
    backgroundMusic.loop = true;

    gameContainer.removeAllChildren();

    if (enemyType == 1) {        //Enemy is Aaron
        enmyinit = new Aaron(enemyLevel);
    } else if (enemyType == 2) { //Enemy is Alex
        enmyinit = new Alex(enemyLevel);
    } else if (enemyType == 3) { //Enemy is Brad
        enmyinit = new Brad(enemyLevel);
    } else if (enemyType == 4) { //Enemy is Hayden 
        enmyinit = new Hayden(enemyLevel);
    } else if (enemyType == 5) { //Enemy is Jacob
        enmyinit = new Jacob(enemyLevel);
    } else if (enemyType == 6) { //Enemy is Naropa
        enmyinit = new Naropa(enemyLevel);
    }

    myRando = enmyinit;
    randoHealth = myRando.maxHealth;

    setupScene();

    mainOption();

    //player.experience += 1;
    updateBarText();
}

function setupScene() {
    combatShape.graphics.beginBitmapFill(combatBackground, "no-repeat").drawRect(0, 0, 992, 544);
    combatEnemy.graphics.beginBitmapFill(Enemy1, "no-repeat").drawRect(0, 0, 80, 240);
    combatEnemy.x = 480;
    combatEnemy.y = 180;
    healthText = new createjs.Text(myRando.name + "'s Health: " + randoHealth.toString(), "bold 36pt Arial", "black");
    healthText.textAlign = "center";
    healthText.textBaseline = "middle";
    healthText.x = (screenWidth * 64 + 32) / 2;
    healthText.y = (screenHeight * 64 + 32) / 4;

    gameContainer.addChild(combatShape);
    gameContainer.addChild(combatEnemy);
    gameContainer.addChild(healthText);

    gameContainer.addChild(getHudbarDisplay());
    stage.update();
}

function mainOption() {
    msg = Messenger().post({
        message: myRando.name + ' appeared! Choose an option.',
        type: 'info',
        hideAfter: false,
        actions: {
            attack: {
                label: 'Attack!',
                hideAfter: false,
                action: function() {
                    return secondaryOption("attack");
                }
            },

            /* defend: {
                 label: 'Defend!',
                 action: function() {
                     goBack();
                     return msg.update({
                         message: 'You dodged a devestating smash!',
                         type: 'success',
                         hideAfter: 3,
                         actions: false
                     });
                 }
             },*/

            run: {
                label: 'Run!',
                action: function() {
                    goBack();
                    return msg.update({
                        message: 'You really ran away from that?',
                        type: 'success',
                        hideAfter: 3,
                        actions: false
                    });
                }
            }
        }
    });
}

function secondaryOption(type) {
    var damage;
    if (randomInt(0,100) < ((myRando.level - player.level) * 5 + 10)) {
        damage = 0; // Chance to miss is based on your level relative to the enemy's (10% baseline + 5% per level the rando is higher than you (applies for negative level difference))
    } else {
        damage = Math.floor((Math.random() * player.strength + 5) + 1);
    }
    if (type == "attack") {
        msg.update({
            message: 'Choose an attack style.',
            type: 'success',
            hideAfter: false,
            actions: {
                punch: {
                    label: 'Punch!',
                    action: function() {
                        randoHealth -= damage;
                        if (randoHealth <= 0) {
                            goBack();
                            var exp = Math.floor(randomInt(30, 45) -  (7 * (player.level - myRando.level)));
                            var uroGain = Math.floor(randomInt(myRando.level * 10) + randomInt(5,25));
                            player.addExperience(exp);
                            player.setMoney(player.money + uroGain);
                            return msg.update({
                                message: 'You have defeated the all-mighty ' + myRando.name + ', bro!  Way to go!! +' + exp + ' experience. +' + uroGain + ' uRos.',
                                type: 'success',
                                hideAfter: 3,
                                actions: false
                            });
                        } else {
                            healthText.text = (myRando.name + "'s Health: " + randoHealth);
                            stage.update();
							
							if (damage == 0) {
								attack2("You missed! +0 damage");
							} else if (damage <= 5) {
								return attack2("Your fists are mighty. +" + damage + " damage");
							} else if (damage <= 13) {
								return attack2("You are a champion boxer. +" + damage + " damage");
							} else {
								return attack2("You are basically Mike Tyson. +" + damage + " damage");
							}
                        }
                    }
                },
                kick: {
                    label: 'Kick!',
                    action: function() {
                        randoHealth -= damage;
                        if (randoHealth <= 0) {
                            goBack();
                            var exp = Math.floor(randomInt(30, 45) -  (7 * (player.level - myRando.level)));
                            var uroGain = Math.floor(randomInt(myRando.level * 10) + randomInt(5,25));
                            player.addExperience(exp);
                            player.setMoney(player.money + uroGain);
                            return msg.update({
                                message: 'You have defeated the all-mighty ' + myRando.name + ', bro!  Way to go!! +' + exp + ' experience. +' + uroGain + ' uRos.',
                                type: 'success',
                                hideAfter: 3,
                                actions: false
                            });
                        } else {
                            healthText.text = (myRando.name + "'s Health: " + randoHealth);
                            stage.update();
							
							if (damage == 0) {
								attack2("You missed! +0 damage");
							} else if (damage <= 5) {
								return attack2("Your foot made a successful impact. +" + damage + " damage");
							} else if (damage <= 13) {
								return attack2("You are a karate master! +" + damage + " damage");
							} else {
								return attack2("You have the kick of a kangaroo! +" + damage + " damage");
							}
                        }
                    }
                }
                sing: {
                    label: 'Sing!',
                    action: function() {
                        if (randoHealth <= 0) {
                            goBack();
                        }
                        return attack2("This is no time for singing! +0 Damage!");
                    }
                }
            }
        });
    }
}

function attack2(statement) {
    msg.update({
        message: statement,
        type: 'success',
        hideAfter: false,
        actions: {
            Continue: {
                label: 'Continue.',
                action: function() {
                    return enemyTurn();
                }
            }
        }
    });
}

function enemyTurn() {
    msg.update({
        message: myRando.name + " is contemplating his next move...",
        type: 'info',
        hideAfter: false,
        actions: {
            Continue: {
                label: 'Continue.',
                action: function() {
                    //console.log(myRando.decide());//.decide()); // <---- produces error even when I set return to just false
                    return enemyTurn2(myRando.decide()); //"attack 0");//myRando.decide());
                }
            }
        }
    });
}

function enemyTurn2(decision) {
    if (decision.indexOf("attack") != -1) {
        var damage = decision.substring(decision.indexOf(" "));

        if (damage == 0) {
            msg.update({
                message: myRando.name + " just BARELY missed you!",
                type: 'success',
                hideAfter: false,
                actions: {
                    Continue: {
                        label: 'Continue.',
                        action: function() {
                            return secondaryOption("attack");
                        }
                    }
                }
            });
        } else {
            msg.update({
                message: myRando.name + " assaulted you! +" + damage + " damage.",
                type: 'success',
                hideAfter: false,
                actions: {
                    Continue: {
                        label: 'Continue.',
                        action: function() {
                            var isDead = false;
                            // weird workaround but has to be done...
                            player.setHealth(player.health - damage);
                            if (player.health <= 0) {
                                isDead = true;
                                //}else{
                                //player.health -= damage;//player.setHealth(currHealth-damage); //.takeDamage(damage); take damage doesn't work
                            }
                            gameContainer.removeAllChildren();
                            var hudbar = getHudbarDisplay();
                            hudbar.setTransform(10, 10);
                            gameContainer.addChild(hudbar);
                            setupScene();
                            stage.update();
                            if (isDead) {
                                msg.update({
                                    message: "Oh dear! You died!",
                                    type: "error",
                                    hideAfter: false,
                                    actions: {
                                        Continue: {
                                            label: 'Conintue',
                                            action: function() {
                                                player.die()
                                                return msg.cancel();
                                            }
                                        }
                                    }
                                });
                            } else {
                                return secondaryOption("attack");
                            }
                        }
                    }
                }
            });
        }
    } else if (decision.indexOf("heal") != -1) {
        var healAmount = decision.substring(decision.indexOf(" "));

        msg.update({
            message: myRando.name + " healed himself! +" + healAmount + " health.",
            type: 'success',
            hideAfter: false,
            actions: {
                Continue: {
                    label: 'Continue.',
                    action: function() {
                        randoHealth += parseInt(healAmount);
                        healthText.text = ("Rando Health: " + randoHealth);
                        stage.update();
                        return secondaryOption("attack");
                    }
                }
            }
        });
    } else if (decision.indexOf("spell") != -1) {
        var damage = decision.substring(decision.indexOf(" "));

        if (damage == 0) {
            msg.update({
                message: myRando.name + " just BARELY missed you!",
                type: 'success',
                hideAfter: false,
                actions: {
                    Continue: {
                        label: 'Continue.',
                        action: function() {
                            return secondaryOption("attack");
                        }
                    }
                }
            });
        } else {
            msg.update({
                message: myRando.name + " cast a magic spell on you! +" + damage + " damage.",
                type: 'success',
                hideAfter: false,
                actions: {
                    Continue: {
                        label: 'Continue.',
                        action: function() {
                            var isDead = false;
                            // weird workaround but has to be done...
                            player.setHealth(player.health - damage);
                            if (player.health <= 0) {
                                isDead = true;
                                //}else{
                                //player.health -= damage;//player.setHealth(currHealth-damage); //.takeDamage(damage); take damage doesn't work
                            }
                            gameContainer.removeAllChildren();
                            var hudbar = getHudbarDisplay();
                            hudbar.setTransform(10, 10);
                            gameContainer.addChild(hudbar);
                            setupScene();
                            stage.update();
                            if (isDead) {
                                msg.update({
                                    message: "Oh dear! You died!",
                                    type: "error",
                                    hideAfter: false,
                                    actions: {
                                        Continue: {
                                            label: 'Conintue',
                                            action: function() {
                                                player.die();
                                                return msg.cancel();
                                            }
                                        }
                                    }
                                });
                            } else {
                                return secondaryOption("attack");
                            }
                        }
                    }
                }
            });
        }
    }
}

function goBack() {
    resetItems();
    inCombat = false;
    backgroundMusic.play();
    fightMusic.pause();
    saveGame();
}
