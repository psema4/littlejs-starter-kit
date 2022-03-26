addGameScope(new GameScope({
    name: 'Scene 1',
    type: SCOPES.GAME,
    subType: 'DEFAULT',

    scopedUpdate: true,
    scopedRender: true,
    scopedKeboard: true,
    scopedMouse: true,

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
