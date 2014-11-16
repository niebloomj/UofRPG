function Player(name, map) {
	this.name = name;
	this.map = map;

	this.maxHealth = 20;
	this.health = this.maxHealth;

	this.isMoveU = false;
	this.isMoveD = false;
	this.isMoveL = false;
	this.isMoveR = false;

	this.isSprinting = false;
	this.isNoCollide = false;

	this.isMovingLeft = true;

	this.walkSpeed = 5;
	this.sprintMultiplier = 1.5;

	this.totalMoved = 0;

	this.currentCharacter = 0;
	this.characters = [
		"img/sprites/player_santiago.png",
		"img/sprites/player_alex.png",
		"img/sprites/player_brad.png",
		"img/sprites/player_naropa.png",
		"img/sprites/player_aaron.png",
		"img/sprites/player_hayden.png",
		"img/sprites/player_jacob.png"
	];
}

// defines a human-controlled entity
Player.prototype = new Entity(3200, 3200);

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

// tells this entity to move according to its current velocity
Player.prototype.move = function(delta) {
	//Storing variable instead of running
	//function twice was INTENTIONAL
	var moveXBy = this.deltaX(delta);
	var moveYBy = this.deltaY(delta);
	if (moveXBy != 0 || moveYBy != 0) {
		this.updateSteps();
	}
	this.x += moveXBy;
	this.y += moveYBy;
};

Player.prototype.updateSteps = function() {
	if (this.totalMoved % 100 == 0) {
		var globalSteps = this.totalMoved
		var steps = new PlayerStatsTable()
		var query = new Parse.Query(PlayerStatsTable);
		query.equalTo("Username", username);
		query.find({
			success: function(results) {
				if (results.length == 1) {
					var object = results[0];
					object.save(null, {
						success: function(object) {
							var newStepCount = object.get('Steps') + globalSteps;
							object.set("Steps", newStepCount);
							object.save();
							console.log(newStepCount + " Total Steps Taken");
						}
					});
				} else if (results.length == 0) {
					steps.set("Username", username);
					steps.save(null, {
						success: function(steps) {
							var newStepCount = object.get('Steps') + globalSteps;
							object.set("Steps", newStepCount);
							object.save();
							console.log(newStepCount + "Total Steps Taken");
						}
					});
				}
			},
			error: function(error) {
				showLoginMessage(error.message, "danger");
			}
		});
		this.totalMoved = 0;
	}
}

Player.prototype.tick = function(delta) {
	this.move(delta);

	if (this.isMoveR && !(this.isMoveL)) {
		this.isMovingLeft = false;
	}
	if (this.isMoveL && !(this.isMoveR)) {
		this.isMovingLeft = true;
	}
};

Player.prototype.iterateCharacter = function() {
	this.currentCharacter = (this.currentCharacter + 1) % this.characters.length;
}

Player.prototype.getDisplay = function() {

	var sprite = new createjs.Bitmap(this.characters[this.currentCharacter]);
	sprite.setTransform(0, -1 * this.height());
	if (!(this.isMovingLeft)) {
		sprite.x = this.width();
		sprite.scaleX = -1;
	}

	var parent = new createjs.Container();
	parent.addChild(sprite)
	return parent;

};

Player.prototype.width = function() {
	return 16;
};

Player.prototype.height = function() {
	return 48;
};
