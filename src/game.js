/*
 *  LittleJS Starter Kit 
 *  @psema4 2022
*/


'use strict';

function dummyFunc() {}
const sound_click = new Sound([.5,.5])
if (debug) onerror = (...parameters) => alert(parameters)

currentScope = previousScope = gameScopes[0]._name

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
setTimeout(() => {
    engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'assets/tiles.png')
}, 1000)
