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
	
	// Implement timer feature with below code later
	/*var i = 0;
	Messenger().run({
	  errorMessage: 'You missed.',
	  successMessage: 'You dealt 10 damage!',
	  action: function(opts) {
		if (++i < 3) {
		  return opts.error({
			status: 500,
			readyState: 0,
			responseText: 0
		  });
		} else {
		  return opts.success();
		}
	  }
	});*/
	
	var msg;

	msg = Messenger().post({
	  message: 'Choose an option.',
	  type: 'info',
	  actions: {
		attack: {
		  label: 'Attack!',
		  action: function() {
			return msg.update({
			  message: 'You dealt so much damage bro!',
			  type: 'success',
			  actions: false
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
		  }
		}
	  }
	});

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
