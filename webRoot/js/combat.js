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
							}
						},
						sing: {
							label: 'Sing!',
							action: function() {
								return msg.update({
								message: 'This is no time for singing! +0 Damage!',
								type: 'success',
								actions: false
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
			}
		}
	  }
	});
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
