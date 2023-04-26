// Get the canvas element from the HTML file
const canvas = document.getElementById('myCanvas');

// Set the canvas dimensions and get the 2D drawing context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
//c.lineWidth = 5;
//c.globalAlpha = 0.5;

// Define any variables or constants needed for your animations
let x = 0;
let y = 0;

// Define functions for drawing and animating your graphics
function draw() {
	// Add code here to draw your graphics on the canvas
	ctx.fillRect(x, y, 50, 50);
}

function animate() {
	// Add code here to update the position of your graphics and trigger new frames
	x++;
	y++;
	requestAnimationFrame(animate);
}

// Call your animation functions to start the animation loop
draw();
animate();