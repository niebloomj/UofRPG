var inCombat = false;
var combatTicks = 0;
var combatShape = new createjs.Shape();
var combatText = new createjs.Text("#feelinit", "bold 36pt Arial", "red");
var combatBackground = new Image();
combatBackground.src = 'img/CombatTest.png';
var fightMusic = new Audio('..\/audio\/FightMusic.mp3');

function initCombat() {
    var combatSuccessful = false;
    inCombat = true;
    fightMusic.volume = fightMusic.volume * .7;
    backgroundMusic.pause();
    fightMusic.play();
    backgroundMusic=new Audio('..\/audio\/BackgroundMusic.mp3');
    backgroundMusic.loop=true;

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
        message: 'Some rando appeared! Choose an option.',
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
                                    goBack();
                                    return msg.update({
                                        message: 'Your fists are mighty. +10 Damage!',
                                        type: 'success',
                                        hideAfter: 3,
                                        actions: false
                                    });
                                }
                            },
                            kick: {
                                label: 'Kick!',
                                action: function() {
                                    goBack();
                                    return msg.update({
                                        message: 'You have the kick of a kangaroo. +200 Damage!',
                                        type: 'success',
                                        hideAfter: 3,
                                        actions: false
                                    });
                                }
                            },
                            sing: {
                                label: 'Sing!',
                                action: function() {
                                    goBack();
                                    return msg.update({
                                        message: 'This is no time for singing! +0 Damage!',
                                        type: 'success',
                                        hideAfter: 3,
                                        actions: false
                                    });
                                }
                            }
                        }
                    });
                }
            },

            defend: {
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
            }
        }
    });
    //expPct += 0.1;
    //updateBarText();
}

function goBack(){
    inCombat = false;
    backgroundMusic.play();
    fightMusic.pause();
}
