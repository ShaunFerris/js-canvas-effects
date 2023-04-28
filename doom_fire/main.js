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