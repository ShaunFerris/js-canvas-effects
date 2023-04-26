// Get the canvas element from the HTML file
const canvas = document.getElementById('myCanvas');

// Set the canvas dimensions and get the 2D drawing context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
//c.lineWidth = 5;
//c.globalAlpha = 0.5;
c.strokeWidth = 5;
const grav = 0.99;

// Define mouse position and set listener
let mouseX = 0;
let mouseY = 0;
addEventListener("mousemove", function() {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function randoColor() {
    let rcol = () => Math.round(Math.random() * 250);
    let rtran = () => Math.ceil(Math.random() * 10) / 10;
    return (
        `rgba(${rcol()}, ${rcol()}, ${rcol()}, ${rtran()})`
    );
}