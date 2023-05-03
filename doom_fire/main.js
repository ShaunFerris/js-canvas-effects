/*
Implementation of the algorithm used for the fire background
on the splashscreen of Doom(1993) in JavaScript, rendered on an
HTML5 canvas element.
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
    let termx = 120 //window.innerWidth;
    let termy = 80 //window.innerHeight;
    canvas.width = termx;
    canvas.height = termy;
    return {canvas, ctx, termx, termy};
}

class DoomFire {
    /*
    Class wrapper for the Doom fire animation. Initialized with
    the output of the setupCanvas function.
    */
    constructor({canvas, ctx, termx, termy}) {
        //Initialize the canvas variables
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = ctx.createImageData(termx, termy);
        this.termx = termx;
        this.termy = termy;

        //Initialize the fire class instance variables
        this.firePixels = [];
        this.palette = [
            {"r":7,"g":7,"b":7}, {"r":31,"g":7,"b":7},
            {"r":47,"g":15,"b":7}, {"r":71,"g":15,"b":7},
            {"r":87,"g":23,"b":7}, {"r":103,"g":31,"b":7},
            {"r":119,"g":31,"b":7}, {"r":143,"g":39,"b":7},
            {"r":159,"g":47,"b":7}, {"r":175,"g":63,"b":7},
            {"r":191,"g":71,"b":7}, {"r":199,"g":71,"b":7},
            {"r":223,"g":79,"b":7}, {"r":223,"g":87,"b":7},
            {"r":223,"g":87,"b":7}, {"r":215,"g":95,"b":7},
            {"r":215,"g":95,"b":7}, {"r":215,"g":103,"b":15},
            {"r":207,"g":111,"b":15}, {"r":207,"g":119,"b":15},
            {"r":207,"g":127,"b":15}, {"r":207,"g":135,"b":23},
            {"r":199,"g":135,"b":23}, {"r":199,"g":143,"b":23},
            {"r":199,"g":151,"b":31}, {"r":191,"g":159,"b":31},
            {"r":191,"g":159,"b":31}, {"r":191,"g":167,"b":39},
            {"r":191,"g":167,"b":39}, {"r":191,"g":175,"b":47},
            {"r":183,"g":175,"b":47}, {"r":183,"g":183,"b":47},
            {"r":183,"g":183,"b":55}, {"r":207,"g":207,"b":111},
            {"r":223,"g":223,"b":159}, {"r":239,"g":239,"b":199},
            {"r":255,"g":255,"b":255}
        ];

        //Start main animation loop
        this.animate();
        
        //Initialize listeners for interaction
        this.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (e.button === 0) {
                this.increaseFireSource();
            } else if (e.button === 2) {
                this.decreaseFireSource();
            }
        });
    }

    animate() {
        /*
        Begin image generation. 
        Unlike the other canvas animations in this directory, this 
        example uses the image and putImageData features to constantly
        update a displayed image rather than a requestAnimationFrame loop.
        */
        this.createFireData();
        this.createFireSource();

        setInterval(() => this.calcFirePropagation(), 50);
    }

    createFireData() {
        /*
        Updates the instance variable firePixels with one item per unit
        of the canvas area. The array entries are initialized to 0.
        */
        const nPixels = this.termx * this.termy;
        for (let i = 0; i < nPixels; i++) {
            this.firePixels[i] = 0;
        }
    }

    updatePixelIntensity(currPixelInd) {
        /*
        Updates the intensity of one pixel represented in the firePixels 
        array.
        */
        const belowPixelIndex = currPixelInd + this.termx;
        if (belowPixelIndex >= this.termx * this.termy) {
            return;
        }
        const decay = Math.floor(Math.random() * 3);
        const belowPixelFireIntensity = this.firePixels[belowPixelIndex];
        const newIntensity = 
            belowPixelFireIntensity - decay >= 0 ? 
                belowPixelFireIntensity - decay :
                0;
        // add the decay to make the wind direction to the right
        //add a 50/50 condition for random wind
        this.firePixels[currPixelInd - decay] = newIntensity;
    }

    renderFire() {
        /*
        Update every pixel in the firePixels array with a new color from
        the firePixels array, then push this to the context image data, 
        and finally call the ctx.putImageData() function to update the
        onscreen render.
        */
        for ( let pixelIndex = 0;
            pixelIndex < this.firePixels.length;
            pixelIndex++) {
                const fireIntensity = this.firePixels[pixelIndex];
                const color = this.palette[fireIntensity];
                //Consider using a destructuring assignment here
                this.image.data[pixelIndex * 4] = color.r;
                this.image.data[pixelIndex * 4 + 1] = color.g;
                this.image.data[pixelIndex * 4 + 2] = color.b;
                this.image.data[pixelIndex * 4 + 3] = 255;
        }
        this.ctx.putImageData(this.image, 0, 0);
    }

    calcFirePropagation() {
        /*
        Loop through and update the intensity of pixels in a pattern.
        */
        for (let col = 0; col < this.termx; col++) {
            for (let row = 0; row < this.termy; row++) {
                const pixelIndex = col + this.termx * row;
                this.updatePixelIntensity(pixelIndex);
            }
        }
        this.renderFire();
    }

    createFireSource() {
        /*
        Sets the lowest row of pixels int the firePixels array to an 
        intesity level of 36, allowing for the propogation function to
        move the fire upscreen until the decay factor puts it out.
        */
        for (let col = 0; col <= this.termx; col++) {
            const overflowPixelIndex = this.termx * this.termy;
            const pixelIndex = (overflowPixelIndex - this.termx) + col;
            this.firePixels[pixelIndex] = 36;
        }
    }

    destroyFireSource() {
        /*
        Identifies the lowest row of firepixels, which behave as the 
        source for all other fire pixels on screen, and sets their
        intesity in the firePixels instance variable to 0, extinguishing
        the fire.
        */
        for (let col = 0; col <= this.termx; col++) {
            const overflowPixelIndex = this.termx * this.termy;
            const pixelIndex = (overflowPixelIndex - this.termx) + col;
            this.firePixels[pixelIndex] = 0;
        }
    }

    increaseFireSource() {
        /*
        Loops over the source pixels in the firePixels array in the same
        way as the destroy firesource function above. Generates a random
        value to increase their intesity by and does so if this would
        not put intensity over 36, otherwise sets intensity to 36.
        */
        for (let col = 0; col <= this.termx; col++) {
            const overflowPixelIndex = this.termx * this.termy;
            const pixelIndex = (overflowPixelIndex - this.termx) + col;
            const currentFireIntensity = this.firePixels[pixelIndex]

            if (currentFireIntensity < 36) {
                const increase = Math.floor(Math.random() * 14);
                const newFireIntensity =
                    currentFireIntensity + increase >= 36 ?
                        36:
                        currentFireIntensity + increase;
                this.firePixels[pixelIndex] = newFireIntensity;
            }
        }
    }

    decreaseFireSource() {
        /*
        Loops over the source pixels in the firePixels array in the same
        way as the destroy firesource function above. Generates a random
        value to decay their intesity by and does so if this would
        not put intensity below 0, otherwise sets intensity to 0.
        */
        for (let col = 0; col <= this.termx; col++) {
            const overflowPixelIndex = this.termx * this.termy;
            const pixelIndex = (overflowPixelIndex - this.termx) + col;
            const currentFireIntensity = this.firePixels[pixelIndex];

            if (currentFireIntensity > 0) {
                const decay = Math.floor(Math.random() * 14);
                const newFireIntensity =
                currentFireIntensity - decay >= 0 ?
                    currentFireIntensity - decay :
                    0;
                this.firePixels[pixelIndex] = newFireIntensity;
            }
        }
    }



}

const can = setupCanvas();
const fire = new DoomFire(can);