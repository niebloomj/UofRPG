var inCombat = false;
var combatTicks = 0;
var combatShape = new createjs.Shape();
var combatText = new createjs.Text("#feelinit", "bold 36pt Arial", "red");
var combatBackground = new Image();
combatBackground.src = 'img/CombatTest.png';


function initCombat() {
    inCombat = true;

    gameContainer.removeAllChildren();

    combatShape.graphics.beginBitmapFill(combatBackground, "no-repeat").drawRect(0, 0, 992, 544);
    combatText.textAlign = "center";
    combatText.textBaseline = "middle";
    combatText.x = (screenWidth * 64 + 32) / 2;
    combatText.y = (screenHeight * 64 + 32) / 2;

    gameContainer.addChild(combatShape);
    gameContainer.addChild(combatText);

    
    // HUDBAR SETTINGS
    var hudbarWidth = 192; // hudbar width (in px)
    var hudbarHeight = 24; // hudbar height (in px)

    var hudbarBorder = 3; // border inside the hudbar (in px)

    // dimensions of inner hudbar (e.g. excluding border)
    var hudbarInnerWidth = hudbarWidth - hudbarBorder * 2;
    var hudbarInnerHeight = hudbarHeight - hudbarBorder * 2;

    var hudbarIconSize = 24; // width of hudbar icon (in px)
    var hudbarIconPadding = 4; // separation width between icon and hudbar (in px)

    // HEALTHBAR SETTINGS
    var healthbarColorFill = "#2fff00"; //"#e00"; // color of available health
    var healthbarColorEmpty = "#ff0000"; //"#aaa"; // color of missing health
    var healthbarColorBorder = "#222"; // color of hudbar border
    var healthbarIconPath = "img/sprites/heart8_24.png"; // square of size hudbarIconSize

    var healthbarGraphics, healthbarIcon;

    function updateBarText() {
    healthTxt.text = player.health;
    }
    
    function initHudbar() {
    healthbarGraphics = new createjs.Graphics();

    // draw border of health bar
    healthbarGraphics.f(healthbarColorBorder);
    healthbarGraphics.r(
        0, 0,
        hudbarWidth,
        hudbarHeight
    );

    // draw background of health bar
    healthbarGraphics.f(healthbarColorEmpty);
    healthbarGraphics.r(
        hudbarBorder, hudbarBorder,
        hudbarInnerWidth,
        hudbarInnerHeight
    );

    healthbarIcon = new createjs.Bitmap(healthbarIconPath);
    
    }
    function getHudbarDisplay() {

    // create images;
    var hudbar = new createjs.Container();
    var healthbar = new createjs.Shape;
    healthbar.graphics = healthbarGraphics;

    var healthPct = player.health / player.maxHealth; // fraction representing player health

    // add health bar icon to hudbar
    hudbar.addChild(healthbarIcon);

    // draw filled section of healthbar
    healthbar.graphics.f(healthbarColorFill);
    healthbar.graphics.r(
        hudbarBorder, hudbarBorder,
        Math.floor(hudbarInnerWidth * healthPct),
        hudbarInnerHeight
    );

    // add health bar to hudbar
    healthbar.setTransform(hudbarIconSize + hudbarIconPadding, 0);
    hudbar.addChild(healthbar);

    healthTxt = new createjs.Text("0", "20px Verdana", "#ff0000");
    healthTxt.x = 222;
    healthTxt.y = 0;
    hudbar.addChild(healthTxt);

    updateBarText();

    return hudbar;
}
    gameContainer.addChild(getHudbarDisplay());
    stage.update();

    var msg;

    msg = Messenger().post({
        message: 'Choose an option.',
        type: 'info',
        actions: {
            attack: {
                label: 'Attack!',
                action: function() {
                    return msg.update({
                        message: 'Choose an attack style.',
                        type: 'success',
                        actions: {
                            punch: {
                                label: 'Punch!',
                                action: function() {
                                    return msg.update({
                                        message: 'Your fists are mighty. +10 Damage!',
                                        type: 'success',
                                        actions: false
                                    });
                                    setTimeout(function() {
                                        inCombat = false;
                                    }, 1);
                                }
                            },
                            kick: {
                                label: 'Kick!',
                                action: function() {
                                    return msg.update({
                                        message: 'You have the kick of a kangaroo. +200 Damage!',
                                        type: 'success',
                                        actions: false
                                    });
                                    setTimeout(function() {
                                        inCombat = false;
                                    }, 1);
                                }
                            },
                            sing: {
                                label: 'Sing!',
                                action: function() {
                                    return msg.update({
                                        message: 'This is no time for singing! +0 Damage!',
                                        type: 'success',
                                        actions: false
                                    });
                                    setTimeout(function() {
                                        inCombat = false;
                                    }, 1);
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
                    setTimeout(function() {
                        inCombat = false;
                    }, 1);
                }
            }
        }
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
