function drawBtn(button) {
    drawRect(vec2(button.x, button.y), vec2(button.w, button.h), button.bgColor, 0, 0)
    // drawText(`${button.label}`, overlayCanvas.width/2, overlayCanvas.height/2 - 30/2, 30)
    drawText(`${button.label}`, overlayCanvas.width/2 + button.x, overlayCanvas.height/2 - 12 + (button.y*15)*-1, 30)
}

addGameScope(new GameScope({
    // Scope Details
    name: 'Main Menu',
    type: SCOPES.MENU,
    subType: 'MAIN',

    // Framework-enforced flags
    scopedUpdate: true,  // default: true   only process updates when currentScope === this._name
    scopedRender: true,  // default: true   only render when currentScope === this._name

    // Soft flags (not enforced, methods below should check these flags)
    scopedKeboard: true, // default: true   only process keyboard input when currentScope === this._name
    scopedMouse: true,   // default: true   only process mouse input when currentScope === this._name
    scopedGamepad: true, // default: true   only process gamepad input when currentScope === this._name

    // Variables
    vars: {
        buttons: []
    },

    // Engine Methods
    gameInit: function () {
        if (debug) console.debug(`${this._name} initialized.`)

        this._vars.buttons.push({
            x: 0,
            y: 0,
            w: 10,
            h: 2,
            label: 'Btn0',
            bgColor: new Color(.7, .7, .7),
        })

        this._vars.buttons.push({
            x: 0,
            y: 5,
            w: 10,
            h: 2,
            label: 'Btn1',
            bgColor: new Color(.7, .7, .9),
        })

        this._vars.buttons.push({
            x: 0,
            y: 10,
            w: 10,
            h: 2,
            label: 'Btn2',
            bgColor: new Color(.7, .9, .7),
        })
    },

    gameUpdate: function () {
        // Handle Mouse clicks
        if (!this._scopedMouse || (this._scopedMouse && this._name === currentScope)) {
            if (mouseWasPressed(0)) {
                let clickPos = mousePos.floor()

                this._vars.buttons.forEach((button, btnIdx) => {
                    let bounds = {
                        x1: button.x - button.w/2,
                        x2: button.x + button.w/2,
                        y1: button.y - button.h/2,
                        y2: button.y + button.h/2,
                    }

                    if (clickPos.x >= bounds.x1 && clickPos.x <= bounds.x2) {
                        if (clickPos.y >= bounds.y1 && clickPos.y <= bounds.y2) {
                            console.log(`Clicked on button ${btnIdx}!`)
                            new Sound([.5,.5]).play(mousePos)
                        }
                    }
                })
            }
        }
    },
    gameUpdatePost: function () {},
    gameRender: function () {
        drawRect(cameraPos, tileCollisionSize.add(vec2(50,40)), new Color(.2, .2, .2), 0, 0)

        this._vars.buttons.forEach((button) => {
            drawBtn(button)
        })
    },
    gameRenderPost: function () {
        drawText(`${this._name}`, overlayCanvas.width/2, 80, 70)
    },

    // Framework Methods
    onEnter: function() {},
    onExit: function() {},
}))
