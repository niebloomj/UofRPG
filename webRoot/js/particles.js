var canvas = document.getElementById("demoCanvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = 500; var H = 500;

//Lets create an array of particles
var particles = [];
for(var i = 0; i < 50; i++)
{
	//This will add 50 particles to the array with random positions
	particles.push(new create_particle());
}

//Lets create a function which will help us to create multiple particles
function create_particle()
{
	//Random position on the canvas
	this.x = Math.random()*W;
	this.y = Math.random()*H;
	
	//Lets add random velocity to each particle
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
	
	//Random colors
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color = "rgba("+r+", "+g+", "+b+", 0.5)";
	
	//Random size
	this.radius = Math.random()*20+20;
}

var x = 100; var y = 100;

//Lets animate the particle
function draw()
{
	//Moving this BG paint code insde draw() will help remove the trail
	//of the particle
	//Lets paint the canvas black
	//But the BG paint shouldn't blend with the previous frame
	ctx.globalCompositeOperation = "source-over";
	//Lets reduce the opacity of the BG paint to give the final touch
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, W, H);
	
	//Lets blend the particle with the BG
	ctx.globalCompositeOperation = "lighter";
	
	//Lets draw particles from the array now
	for(var t = 0; t < particles.length; t++)
	{
		var p = particles[t];
		
		ctx.beginPath();
		
		//Time for some colors
		var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, p.color);
		gradient.addColorStop(1, "black");
		
		ctx.fillStyle = gradient;
		ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
		ctx.fill();
		
		//Lets use the velocity now
		p.x += p.vx;
		p.y += p.vy;
		
		//To prevent the balls from moving out of the canvas
		if(p.x < -50) p.x = W+50;
		if(p.y < -50) p.y = H+50;
		if(p.x > W+50) p.x = -50;
		if(p.y > H+50) p.y = -50;
	}
}

setInterval(draw, 33);