addGameScope(new GameScope({
    name: 'Overworld',
    type: SCOPES.GAME,
    subType: 'DEFAULT',

    scopedUpdate: true,
    scopedRender: true,
    scopedKeboard: true,
    scopedMouse: true,
    scopedGamepad: true,

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

    gameInit:       function () { if (debug) console.debug(`${this._name} initialized.`) },

    gameUpdate:     function () {
        if (!this._scopedMouse || (this._scopedMouse && this._name === currentScope)) {
            if (mouseWasPressed(0)) sound_click.play(mousePos)
        }

        if (!this._scopedKeyboard || (this._scopedKeyboard && this._name === currentScope)) {
            if (keyWasReleased(27)) { // ESC
                setGameScope('Main Menu')
            }
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

    gameRenderPost: function () {
        drawText(`${this._name}`, overlayCanvas.width/2, 80, 70)
        drawText('Press <ESC> to exit', overlayCanvas.width/2, overlayCanvas.height-150, 40)
    },

    onEnter: function() {},
    
    onExit: function() {},
}))
