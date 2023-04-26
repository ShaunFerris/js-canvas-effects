//Get the canvas element from the HTML file
const canvas = document.getElementById('myCanvas');

//Set the canvas dimensions and get the 2D drawing context
const c = canvas.getContext('2d');
let termx = window.innerWidth;
let termy = window.innerHeight;
canvas.width = termx;
canvas.height = termy;
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

//Function to generate random ball objects
function getBallList(n) {
    return Array(n)
        .fill(new Ball());
}

function animate() {
    //Check the terminal dimensions update if neccessary
    if (termx != window.innerWidth || termy != window.innerHeight) {
        termx = window.innerWidth;
        termy = window.innerHeight;
        canvas.width = termx;
        canvas.width = termy;
    }

    //Get animation frame
    requestAnimationFrame(animate);
    c.clearRect(0, 0, termx, termy);

    //Main animation loop
    for (let i = 0; i < ballList.length; i++) {
        ballList[i].update();
        ballList[i].y += ballList[i].dy;
        ballList[i].x += ballList[i].dx;
        if (ballList[i].y + ballList[i].radius >= termy) {
            ballList[i].dy = -ballList[i].dy * grav;
        } else {
            ballList[i].dy += ballList[i].velocity;
        }
        if (ballList[i].x + ballList[i].radius > termx ||
            ballList[i].x - ballList[i].radius < 0) {
                ballList[i].dx = -ballList[i].dx;
        }
        if (mouseX > ballList[i].x - 20 &&
            mouseX < ballList[i].x + 20 &&
            mouseY > ballList[i].y - 50 &&
            mouseY < ballList[i].y + 50 &&
            ballList[i].radius < 70) {
                //ballList[i].x += 1;
                ballList[i].radius += 5;
            } else {
                if ( ballList[i].radius > ballList[i].startradius) {
                    ballList[i].radius += 5;
                }
            }
    } //for loop end
} //Animation end

const ballList = getBallList(50);
animate();

setInterval(function() {
    ballList.push(new Ball());
    ballList.splice(0, 1);
}, 400);