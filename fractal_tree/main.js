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
        this.ctx.fillStyle = "#FF057A";
        this.ctx.fillRect(0, 0, this.termx, this.termy);
        this.ctx.strokeStyle = 'white';
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
            //Recur itself on the right branch
            if (Math.random() > 0.1 || level < 1) {
                this.drawTree(
                    size = 3 * size / 4,
                    x = x + size * Math.sin(angle),
                    y = 
                )
            }
        }
    }
}