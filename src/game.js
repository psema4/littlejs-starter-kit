/*
 *  LittleJS Starter Kit 
 *  @psema4 2022
*/


'use strict';

function dummyFunc() {}
const sound_click = new Sound([.5,.5])
if (debug) onerror = (...parameters) => alert(parameters)

currentScope = 'Overworld'
previousScope = 'Overworld'

function drawText(text, x, y, size=70) {
    overlayContext.textAlign = 'center'
    overlayContext.textBaseline = 'top'
    overlayContext.font = size + 'px arial'
    overlayContext.fillStyle = '#fff'
    overlayContext.lineWidth = 3
    overlayContext.strokeText(text, x, y)
    overlayContext.fillText(text, x, y)
}

// defer
//engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'assets/tiles.png')
