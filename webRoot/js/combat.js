var inCombat = false;
var combatTicks = 0;
var combatShape = new createjs.Shape();
var combatText = new createjs.Text("#feelinit", "bold 36pt Arial", "red");
var combatBackground = new Image();
combatBackground.src = 'img/CombatTest.png';


function initCombat() {
    inCombat = true;

    gameContainer.removeAllChildren();

    combatShape.graphics.beginBitmapFill(combatBackground, "no-repeat").drawRect(0,0, 992, 544);
    combatText.textAlign = "center";
    combatText.textBaseline = "middle";
    combatText.x = (screenWidth * 64 + 32) / 2;
    combatText.y = (screenHeight * 64 + 32) / 2;

    gameContainer.addChild(combatShape);
    gameContainer.addChild(combatText);

    stage.update();

    setTimeout(function() {
        inCombat = false;
    }, 1000);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
