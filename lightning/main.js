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
    const c = canvas.getContext('2d');
    let termx = window.innerWidth;
    let termy = window.innerHeight;
    canvas.width = termx;
    canvas.height = termy;
    return {c, termx, termy}
}

class canvasLightning {
    /*
    Class to contain animation functions and properties. Initialized
    with the canvas properties from setupCanvas().
    */
    constructor(c, termx, termy) {

    }
}