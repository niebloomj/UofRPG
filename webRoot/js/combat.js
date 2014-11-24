var inCombat = false;
var combatTicks = 0;
var combatShape = new createjs.Shape();
var combatText = new createjs.Text("#feelinit", "bold 36pt Arial", "red");
var combatBackground = new Image();
combatBackground.src = 'img/CombatTest.png';
var fightMusic = new Audio('..\/audio\/FightMusic.mp3');


function initCombat() {
    inCombat = true;
    fightMusic.volume = fightMusic.volume * .5;
    backgroundMusic.pause();
    fightMusic.play();

    gameContainer.removeAllChildren();

    combatShape.graphics.beginBitmapFill(combatBackground, "no-repeat").drawRect(0, 0, 992, 544);
    combatText.textAlign = "center";
    combatText.textBaseline = "middle";
    combatText.x = (screenWidth * 64 + 32) / 2;
    combatText.y = (screenHeight * 64 + 32) / 2;

    gameContainer.addChild(combatShape);
    gameContainer.addChild(combatText);

    gameContainer.addChild(getHudbarDisplay());
    stage.update();

    var msg;

    msg = Messenger().post({
        message: 'Choose an option.',
        type: 'info',
        hideAfter: false,
        actions: {
            attack: {
                label: 'Attack!',
                hideAfter: false,
                action: function() {
                    return msg.update({
                        message: 'Choose an attack style.',
                        type: 'success',
                        hideAfter: false,
                        actions: {
                            punch: {
                                label: 'Punch!',
                                action: function() {
                                    return msg.update({
                                        message: 'Your fists are mighty. +10 Damage!',
                                        type: 'success',
                                        hideAfter: false,
                                        actions: false
                                    });
                                    inCombat = false;
                                }
                            },
                            kick: {
                                label: 'Kick!',
                                action: function() {
                                    return msg.update({
                                        message: 'You have the kick of a kangaroo. +200 Damage!',
                                        type: 'success',
                                        hideAfter: false,
                                        actions: false
                                    });
                                    inCombat = false;
                                }
                            },
                            sing: {
                                label: 'Sing!',
                                action: function() {
                                    return msg.update({
                                        message: 'This is no time for singing! +0 Damage!',
                                        type: 'success',
                                        hideAfter: false,
                                        actions: false
                                    });
                                    inCombat = false;
                                }
                            }
                        }
                    });
                }
            },

            defend: {
                label: 'Defend!',
                action: function() {
                    return msg.update({
                        message: 'You dodged a devestating smash!',
                        type: 'success',
                        actions: false
                    });
                    inCombat = false;
                }
            }
        }
    });
}
