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
    let termx = window.innerWidth;
    let termy = window.innerHeight;
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
            {"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},
            {"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},
            {"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},
            {"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},
            {"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},
            {"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},
            {"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},
            {"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},
            {"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},
            {"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},
            {"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},
            {"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},
            {"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},
            {"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},
            {"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},
            {"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},
            {"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},
            {"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},
            {"r":255,"g":255,"b":255}
        ];
        //Add the start or animation function call here once complete
    }

    createFireData() {
        this.nPixels = termx * this.termy;
        for (let i = 0; i < this.nPixels; i++) {
            firePixels[i] = 0;
        }
    }
}