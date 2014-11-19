var money = 0;

function Player(name, map) {
	this.name = name;
	this.map = map;

	this.maxHealth = 20;
	this.health = this.maxHealth;

	this.maxTemp = 100;
	this.temp = this.maxTemp;

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

	var statsTable = new PlayerStatsTable()
	var query = new Parse.Query(PlayerStatsTable);
	query.equalTo("Username", username);
	query.find({
		success: function(results) {
			if (results.length == 1) {
				var object = results[0];
				if (object.get('Uros')) {
					money = object.get('Uros');
				} else {
					money = 0;
				}
				$("#walletAmount").html("$" + money + " URos");
			}
		},
		error: function(error) {
			showLoginMessage(error.message, "danger");
		}
	});

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
	this.handleCollision();

	if (this.isMoveR && !(this.isMoveL)) {
		this.isMovingLeft = false;
	}
	if (this.isMoveL && !(this.isMoveR)) {
		this.isMovingLeft = true;
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

	try {
		if ((layerData.data[botLeftIndex] - 1) == 1) {
			botLeftCollision = true;
		}
	} catch (err) {}
	try {
		if ((layerData.data[topLeftIndex] - 1) == 1) {
			topLeftCollision = true;
		}
	} catch (err) {}
	try {
		if ((layerData.data[topRightIndex] - 1) == 1) {
			topRightCollision = true;
		}
	} catch (err) {}
	try {
		if ((layerData.data[botRightIndex] - 1) == 1) {
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
