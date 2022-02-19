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