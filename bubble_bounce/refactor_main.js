/*
Refactor the bounceballs animation to an object structure
*/
const BounceBalls = function(c, cw, ch) {
    this.init = function() {
        this.loop();
    };
    
    //Setup the animations variables
    let _this = this;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.cw = cw;
    this.ch = ch;
    this.ctx.strokeWidth = 5;
    this.grav = 0.99;

    //Define the mouse position and set a listener
    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    //Function to generate random colors for animation elements
    function randoColor() {
        let rcol = () => Math.rouns(Math.random() * 250);
        let rtran = () => Math.ceil(Math.random() * 10) / 10;
        return (
            `rgba(${rcol()}, ${rcol()}, ${rcol()}, ${rtran()})`
        );
    }

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
        let cw = c.width = window.innerWidth;
        let ch = c.height = window.innerHeight;
        let bb = new BounceBalls(c, cw, ch);

        bb.init();
    }
});

//Allow for canvas resizing when the window is resized
$(window).on('resize', function(){
    _this.cw = _this.c.width = window.innerWidth;
    _this.ch = _this.c.height = window.innerHeight;  
  });