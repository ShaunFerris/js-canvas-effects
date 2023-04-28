/*
Implementation of an animated fractal tree, plotting the 
calculated points onto an html5 canvas element.
*/
function setupCanvas() {
    /*
    Get the canvas element from html, save the 2d animation context
    and the terminal dimensions.
    Returns the canvas object, context, terminalx and terminaly as 
    an object keyed with the variable names.
    */
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    let termx = window.innerWidth;
    let termy = window.innerHeight;
    canvas.width = termx;
    canvas.height = termy;
    return {canvas, ctx, termx, termy};
}

class Fractal {
    /*
    Class wrapper for the properties and functions to animate a
    growing fractat tree. The fractal instance is initialized with
    the output from setupCanvas().
    */
    constructor({canvas, ctx, termx, termy}) {
        //Localise the constructor variables
        this.canvas = canvas;
        this.ctx = ctx;
        this.termx = termx;
        this.termy = termy;

        //Set the instance variables
        this.minSize = 10;
        this.angleDiff = Math.PI/6;
        this.strokeLen = 2;
        this.counter = 0;
        this.ctx.fillStyle = "#FF057A";
        this.ctx.fillRect(0, 0, this.termx, this.termy);
        this.ctx.strokeStyle = 'white';

        this.animate();
    }

    drawTree(size, x, y, angle, minSize, strokeLen, level) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        this.ctx.lineTo(0, 0);
        this.ctx.rotate(angle);
        this.ctx.lineTo(0, -size);
        this.ctx.closePath();
        //this.ctx.arc(0, 0, 1, 0, 2*Math.PI);optional
        this.ctx.lineWidth = strokeLen;
        this.ctx.stroke();
        this.ctx.restore();

        if (size > minSize) {
            /*
            Grow the left and right branches if size is above the 
            minimum. The blocks for the left and right branches are
            identical except one adds the angle dif to the current
            angle and the other subtracts it.
            */
            //Recur itself on the right branch
            if (Math.random() > 0.1 || level < 1) {
                this.drawTree(
                    3 * size / 4,
                    x + size * Math.sin(angle),
                    y - size * Math.cos(angle),
                    angle + this.angleDiff, 
                    minSize,
                    strokeLen * 0.99,
                    level + 1
                );
            }
            //Recur itself on the left branch
            if (Math.random() > 0.1 || level < 1) {
                this.drawTree(
                    3 * size / 4,
                    x + size * Math.sin(angle),
                    y - size * Math.cos(angle),
                    angle - this.angleDiff,
                    minSize,
                    strokeLen * 0.99,
                    level + 1
                );
            }
        }
        console.log("Drawing");
    }

    animate = () => {
        /*
        Main animation loop. Written as an arrow function so that it
        uses the global scope and can access the Fractal instances this
        variable.
        */
        if (this.counter % 20 === 0) {
            this.ctx.clearRect(0, 0, this.termx, this.termy);
            this.ctx.fillRect(0, 0, this.termx, this.termy);
            this.drawTree(
                this.termy / 4,
                this.termx / 2,
                this.termy,
                0,
                this.minSize,
                this.strokeLen,
                0
            );
            this.counter = 1;
        }
        this.counter++;
        window.requestAnimationFrame(this.animate);
    }
    
}

const can = setupCanvas();
const fract = new Fractal(can);