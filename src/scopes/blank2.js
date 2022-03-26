addGameScope(new GameScope({
    // Scope Details
    name: 'Blank2',
    type: SCOPES.GAME,
    subType: 'DEFAULT',

    // Framework-enforced flags
    scopedUpdate: true,  // default: true   only process updates when currentScope === this._name
    scopedRender: true,  // default: true   only render when currentScope === this._name

    // Soft flags (not enforced, methods below should check these flags)
    scopedKeboard: true, // default: true   only process keyboard input when currentScope === this._name
    scopedMouse: true,   // default: true   only process mouse input when currentScope === this._name
    scopedGamepad: true, // default: true   only process gamepad input when currentScope === this._name

    // Variables
    vars: {
    },

    // Engine Methods
    gameInit:       function () { console.debug(`${this._name} initialized.`) },
    gameUpdate:     function () {
        if (!this._scopedMouse || (this._scopedMouse && this._name === currentScope)) {
            if (mouseWasPressed(0)) new Sound([.5,.5]).play(mousePos)
        }
    },
    gameUpdatePost: function () {},
    gameRender:     function () {
        drawRect(cameraPos, tileCollisionSize.add(vec2(50,40)), new Color(.2, .4, .2), 0, 0)

        drawRect(
            cameraPos.add(vec2( 0, 0 )),
            tileCollisionSize.add(vec2(1,1)),
            new Color(1,1,1),
            0,
            0
        )
    },
    gameRenderPost: function () { drawText(`${this._name}`, overlayCanvas.width/2, 80, 70) },

    // Framework Methods
    onEnter: function() {},
    onExit: function() {},
}))
