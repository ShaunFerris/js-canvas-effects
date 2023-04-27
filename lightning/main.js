/*
Implementation of an animated lightning background for
integration into web projects.
*/
function setupCanvas() {
    /*
    Get the canvas element from html, save the 2d animation context
    and the terminal dimensions.
    Returns the context, terminalx and terminaly as an object keyed
    with the variable names.
    */
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    let termx = window.innerWidth;
    let termy = window.innerHeight;
    canvas.width = termx;
    canvas.height = termy;
    return {ctx, termx, termy};
}

class canvasLightning {
    /*
    Class to contain animation functions and properties. Initialized
    with the canvas properties from setupCanvas().
    */
    constructor({ctx, termx, termy}) {
        this.ctx = ctx;
        this.termx = termx;
        this.termy = termy;

        this.lightning = [];
        this.currLightTime = 0;
        this.totalLightTime = 50;
    }

    /*
    Define utility functions for use in the other methods
    */
    rand(randmin, randmax) {
        return ~~(
            Math.random() * (randmax - randmin + 1) + randmin
        );
    }

    hitTest(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(
            x1 + w1 < x2 || x2 + w2 < x1 ||
            y1 + h1 < y2 || y2 + h2 < y1
        );
    }
    /*
    End utility function definitions
    */
    
    createBolt(x, y, canSpawn) {
        /*
        Creates an object representing a bolt of lightning and pushes
        it to the lightning instance property.

        Takes an x and y coordinate and spawnflag boolean, returns an
        object that maps the path of a bolt with randomly generated
        range and path limit.
        */
        this.lightning.push({
            x: x,
            y: y,
            xrange: this.rand(5, 30),
            yrange: this.rand(5, 25),
            path: [{
                x: x,
                y: y
            }],
            pathLimit: this.rand(10, 35),
            canSpawn: canSpawn,
            hasFired: false
        });
    }

    updateBolt() {
        let i = this.lightning.length;
        while (i--) {
            let light = this.lightning[i];

            light.path.push({
                x: light.path[light.path.length-1].x +
                    this.rand(0, light.xrange/2),
                y: light.path[light.path.length-1] +
                    this.rand(0, light.yrange)
            });

            if (light.path.length > light.pathLimit) {
                this.lightning.splice(i, 1);
            }
            light.hasFired = true;
        }
    }

    renderBolt() {
        let i = this.lightning.length;
        while(i--) {
            let light = this.lightning[i];
            this.ctx.strokeStyle = 
                `hsla(0, 100%, 100%, (${this.rand(10, 100)/100})`;
            this.ctx.lineWidth = 1;

            for (let i = 30; i < 151; i += 30) {
                if (this.rand(0, i) === 0) {
                    this.ctx.lineWidth += 1; 
                }
            }
            this.ctx.beginPath();

            let pathCount = light.path.length;
            this.ctx.moveTo(light.x, light.y);
            for (let pc = 0; pc < pathCount; pc++) {
                this.ctx.lineTo(light.path[pc].x, light.path[pc].y);
                
                if (light.canSpawn && this.rand(0, 100) === 0) {
                    light.canSpawn = false;
                    this.createBolt(
                        light.path[pc].x, light.path[pc].y, false
                    );
                }
            }
            if (!light.hasFired) {
                
            }
        }
    }
}

canvas = setupCanvas();
console.log(canvas);
const testCan = new canvasLightning(canvas);
console.log(testCan.termx);