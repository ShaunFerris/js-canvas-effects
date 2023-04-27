/*
Refactor the bounceballs animation to an object structure
*/
const BounceBalls = function(c, cx, cy) {
    this.init = function() {
        this.loop();
    };
    
    //Setup the animations variables
    let _this = this;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.cx = cx;
    this.cy = cy;
    this.ctx.strokeWidth = 5;
    this.grav = 0.99;

    //Define the mouse position and set a listener
    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    //Function to generate random colors for animation elements
    this.randoColor = function() {
        let rcol = () => Math.round(Math.random() * 250);
        let rtran = () => Math.ceil(Math.random() * 10) / 10;
        return (
            `rgba(${rcol()}, ${rcol()}, ${rcol()}, ${rtran()})`
        );
    }

    //Constructor for the balls that will be animated
    this.Ball = function() {
        //Init color, radius, position, heading and velocity to random
        this.color = randoColor();
        this.radius = Math.random() * 20 + 14;
        this.startRadius = this.radius;
        this.x = Math.random() * (BounceBalls.cx - this.radius * 2)
            + this.radius;
        this.y = Math.random() * (BounceBalls.cy - this.radius);
        this.dx = Math.round((Math.random() - 0.5) * 10);
        this.dy = Math.random() * 2;
        this.velocity = Math.random() / 5;

        //Method to update balls position
        this.update = function() {
            BounceBalls.c.beginPath();
            BounceBalls.c.arc(
                this.x, this.y, this.radius, 0, (2 * Math.PI)
            );
            BounceBalls.c.fillStyle = this.color;
            BounceBalls.c.fill();
            //BounceBalls.c.stroke();//comment on and off for effect
        };
    }

    //Function to generate list of random balls
    this.getBallList = function(n) {
        return Array(n)
            .fill(0)
            .map(x => new this.Ball());
    };

}

//Function to check for canvas support in the browser
const canvasSupport = function() {
    let elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2D'));
};

//Define the canvas and initialize on window load event
$(window).load(function() {
    if (canvasSupport) {
        let c = document.getElementById('canvas');
        let cx = c.width = window.innerWidth;
        let cy = c.height = window.innerHeight;
        let bb = new BounceBalls(c, cx, cy);

        bb.init();
    }
});

//Allow for canvas resizing when the window is resized
$(window).on('resize', function(){
    _this.cx = _this.c.width = window.innerWidth;
    _this.cy = _this.c.height = window.innerHeight;  
  });