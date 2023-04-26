//Get the canvas element from the HTML file
const canvas = document.getElementById('myCanvas');

//Set the canvas dimensions and get the 2D drawing context
const c = canvas.getContext('2d');
let termx = window.innerWidth;
let termy = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
//c.lineWidth = 5;
//c.globalAlpha = 0.5;
c.strokeWidth = 5;
const grav = 0.99;

//Define mouse position and set listener
let mouseX = 0;
let mouseY = 0;
addEventListener("mousemove", function() {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

//Function to generate random colors for animation elements
function randoColor() {
    let rcol = () => Math.round(Math.random() * 250);
    let rtran = () => Math.ceil(Math.random() * 10) / 10;
    return (
        `rgba(${rcol()}, ${rcol()}, ${rcol()}, ${rtran()})`
    );
}

//Define a constructor for ball object to animate
function Ball() {
    //Init color, radius, position, heading and velocity to random
    this.color = randoColor();
    this.radius = Math.random() * 20 + 14;
    this.startRadius = this.radius;
    this.x = Math.random() * (termx - this.radius * 2) + this.radius;
    this.y = Math.random() * (termy - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.velocity = Math.random() / 5;
    
    //Define method to update position
    this.update = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        //c.stroke();
    };
}

let test = new Ball();
console.log(test);

//Function to generate random ball objects
function getBallList(n) {
    return Array(n)
        .fill(new Ball());
}
