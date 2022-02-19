/*
 *  LittleJS Starter Kit 
 *  @psema4 2022
*/


'use strict';

function dummyFunc() {}
const sound_click = new Sound([.5,.5])
if (debug) onerror = (...parameters) => alert(parameters)

const SCOPES = {
    MENU: 0,
    GAME: 1,
    TRANSITION: 2,
}

class GameScope {
    constructor(options) {
        if (debug) console.debug('constructing GameScope with options:', options)

        // Scope Details
        this._name = options.name || 'UNNAMED'
        this._type = options.type || SCOPES.GAME
        this._subType = options.subType || 'DEFAULT'

        // Flags
        this._scopedUpdate = (typeof options.scopedUpdate === 'undefined') ? true : options.scopedUpdate
        this._scopedRender = (typeof options.scopedRender === 'undefined') ? true : options.scopedRender
        this._scopedKeyboard = (typeof options.scopedKeyboard === 'undefined') ? true : options.scopedKeyboard
        this._scopedMouse = (typeof options.scopedMouse === 'undefined') ? true : options.scopedMouse
        this._scopedGamepad = (typeof options.scopedGamepad === 'undefined') ? true : options.scopedGamepad

        // Variables
        this._vars = options.vars || {}

        // Engine Methods
        this._gameInit = options.gameInit || dummyFunc
        this._gameUpdate = options.gameUpdate || dummyFunc
        this._gameUpdatePost = options.gameUpdatePost || dummyFunc
        this._gameRender = options.gameRender || dummyFunc
        this._gameRenderPost = options.gameRenderPost || dummyFunc

        // Framework Methods
        this._onEnter = options.onEnter || dummyFunc
        this._onExit = options.onExit || dummyFunc
    }

    // TODO: property getters & setters (clean up developer api)

    // methods
    //
    gameInit() {
        this._gameInit()
    }

    gameUpdate() {
        this._gameUpdate()
    }

    gameUpdatePost() {
        this._gameUpdatePost()
    }

    gameRender() {
        this._gameRender()
    }

    gameRenderPost() {
        this._gameRenderPost()
    }
}

const gameScopes = []
let currentScope = 'Overworld'
let previousScope = 'Overworld'

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

function drawText(text, x, y, size=70) {
    overlayContext.textAlign = 'center'
    overlayContext.textBaseline = 'top'
    overlayContext.font = size + 'px arial'
    overlayContext.fillStyle = '#fff'
    overlayContext.lineWidth = 3
    overlayContext.strokeText(text, x, y)
    overlayContext.fillText(text, x, y)
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

addGameScope(new GameScope({
    // Scope Details
    name: 'Overworld',
    type: SCOPES.GAME,
    subType: 'DEFAULT',

    // Flags
    scopedUpdate: true,  // default: true   only process updates when currentScope === this._name
    scopedRender: false, // default: true   only render when currentScope === this._name
    scopedKeboard: true, // default: true   only process keyboard input when currentScope === this._name
    scopedMouse: true,   // default: true   only process mouse input when currentScope === this._name
    scopedGamepad: true, // default: true   only process gamepad input when currentScope === this._name

    // Variables
    vars: {
        PIXEL_SIZE: 2,
        PIXEL_COLOR: new Color(.7, .7, .2),
        MAP_WIDTH: 8,
        MAP_HEIGHT: 8,
        x: 0,
        y: 0,
        health: 0,
        gold: 0,
        inventory: [],
    },

    // Engine Methods
    gameInit:       function () { console.debug(`${this._name} initialized.`) },
    gameUpdate:     function () {
        if (!this._scopedMouse || (this._scopedMouse && this._name === currentScope)) {
            if (mouseWasPressed(0)) sound_click.play(mousePos)
        }
    },
    gameUpdatePost: function () {},
    gameRender:     function () {
        drawRect(cameraPos, tileCollisionSize.add(vec2(50,40)), new Color(.2, .4, .2), 0, 0)

        drawRect(
            cameraPos.add(
                vec2( (this._vars.x * this._vars.PIXEL_SIZE), (this._vars.y * this._vars.PIXEL_SIZE) )
            ),
            tileCollisionSize.add(vec2(this._vars.PIXEL_SIZE)),
            this._vars.PIXEL_COLOR,
            0,
            0
        )
    },
    gameRenderPost: function () { drawText(`${this._name}`, overlayCanvas.width/2, 80, 70) },

    // Framework Methods
    onEnter: function() {},
    onExit: function() {},
}))

addGameScope(new GameScope({
    name: 'Town 1',
    type: SCOPES.GAME,
    subType: 'DEFAULT',

    scopedUpdate: true,  // default: true   only process updates when currentScope === this._name
    scopedRender: true, // default: true   only render when currentScope === this._name
    scopedKeboard: true, // default: true   only process keyboard input when currentScope === this._name
    scopedMouse: true,   // default: true   only process mouse input when currentScope === this._name

    vars: {
        PIXEL_SIZE: 1,
        PIXEL_COLOR: new Color(.2, .7, .7),
        VISITED_NPC: false,
        x: 0,
        y: 0,
    },

    gameInit:       function () { if (debug) console.debug(`${this._name} initialized.`) },
    gameUpdate:     function () {
        if (!this._scopedMouse || (this._scopedMouse && this._name === currentScope)) {
            if (mouseWasPressed(0)) sound_click.play(mousePos.add(vec2(1.5)))
        }
    },
    gameUpdatePost: function () {},
    gameRender:     function () {
        drawRect(cameraPos, tileCollisionSize.add(vec2(40,30)), new Color(.2, .2, .2), 0, 0)

        drawRect(
            cameraPos.add(
                vec2( (this._vars.x * this._vars.PIXEL_SIZE), (this._vars.y * this._vars.PIXEL_SIZE) )
            ),
            tileCollisionSize.add(vec2(this._vars.PIXEL_SIZE)),
            this._vars.PIXEL_COLOR,
            0,
            0
        )
    },
    gameRenderPost: function () { drawText(`${this._name}`, overlayCanvas.width/2, overlayCanvas.height - 180, 30) },

    onEnter: function() {},
    onExit: function() {},
}))

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'assets/tiles.png')


/* Other Considerations:
 *
 *  - multiple tile/sprite sets
 *  - global, scoped timers & clocks
 *  - global, scoped vars
 *  - common library functions (see also gameEffects.js from the LittleJS platformer example)
 *  - 
 *
 */
