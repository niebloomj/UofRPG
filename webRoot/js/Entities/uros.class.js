function Uros(x, y) {
    this.x = x;
    this.y = y;
}

Uros.prototype = new Entity(this.x, this.y, 32, 32);

Uros.prototype.deltaX = function(elapsedTime) {
    return 0;
};

Uros.prototype.deltaY = function(elapsedTime) {
    return 0;
};

Uros.prototype.tick = function(delta) {
    var xDist = this.x - player.x;
    var yDist = this.y - player.y;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    var isCollision = (new Collider(
        this.x, this.y,
        this.width, this.height).contains(player.x,
        player.y, player.width, player.height));

    if (isCollision) {
        var indexOfUro = entities.indexOf(this);
        if (indexOfUro > -1) {
            entities.splice(indexOfUro, 1);

            //audio by naropian
            //createjs.Sound.alternateExtensions = ["mp3"];
            //createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
            //createjs.Sound.registerSound("..\/img\/Pick up coin.mp3", "sound");
            var audio = new Audio('..\/audio\/coin.mp3');
            audio.volume = audio.volume * .35;
            //audio.volume= .1;
            audio.play();

            player.setMoney(player.money + 10);
            Messenger().post({
                parentLocations: ['.theGame'],
                message: "You got 10 URos!",
                type: "success",
                hideAfter: "3"
            })
        }
    }
};
/*
function loadHandler(event) {
    consol.log("kiss my bum");
    // This is fired for each sound that is registered.
    var instance = createjs.Sound.play("sound"); // play using id.  Could also use full sourcepath or event.src.
    instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
    instance.volume = 0.5;
}
*/
Uros.prototype.move = function(delta) {

};

Uros.prototype.getDisplay = function() {
    var sprite = new createjs.Bitmap("img/coin.png");
    //sprite.setTransform(0,16);

    return sprite;
    // var circle = new createjs.Shape();
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("yellow").drawCircle(0, 0, 16);
    // return circle;
};