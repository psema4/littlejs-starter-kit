/*
 *  LittleJS Starter Kit 
 *  @psema4 2022
*/


'use strict';

function dummyFunc() {}
const sound_click = new Sound([.5,.5])
if (debug) onerror = (...parameters) => alert(parameters)

function drawText(text, x, y, size=70) {
    overlayContext.textAlign = 'center'
    overlayContext.textBaseline = 'top'
    overlayContext.font = size + 'px arial'
    overlayContext.fillStyle = '#fff'
    overlayContext.lineWidth = 3
    overlayContext.strokeText(text, x, y)
    overlayContext.fillText(text, x, y)
}

function addGameScope(scope) {
        gameScopes.push(scope)
}

function getGameScope(scopeName) {
        const results = gameScopes.filter(s=>s._name === scopeName)
        return results && results.length > 0 && results[0]
}

function setGameScope(scopeName='') {
        previousScope = currentScope
        currentScope = scopeName

        const prev = getGameScope(previousScope)
        if (debug) console.debug(`Leaving ${prev._name}.`)
        prev._onExit()

        const curr = getGameScope(currentScope)
        if (debug) console.debug(`Entering "${curr._name}".`)
        curr._onEnter()
}

function gameInit() {
        gameScopes.forEach((scope) => { scope.gameInit() })
}

function gameUpdate() {
        gameScopes.forEach((scope) => { if (!scope._scopedUpdate || (scope._scopedUpdate && scope._name === currentScope)) scope.gameUpdate() })
}

function gameUpdatePost() {
        gameScopes.forEach((scope) => { if (!scope._scopedUpdate || (scope._scopedUpdate && scope._name === currentScope)) scope.gameUpdatePost() })
}

function gameRender() {
        gameScopes.forEach((scope) => { if (!scope._scopedRender || (scope._scopedRender && scope._name === currentScope)) scope.gameRender() })
}

function gameRenderPost() {
        gameScopes.forEach((scope) => { if (!scope._scopedRender || (scope._scopedRender && scope._name === currentScope)) scope.gameRenderPost() })
}
