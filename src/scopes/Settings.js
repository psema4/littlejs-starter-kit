function drawBtn(button) {
    drawRect(vec2(button.x, button.y), vec2(button.w, button.h), button.bgColor, 0, 0)
    drawText(`${button.label}`, overlayCanvas.width/2 + button.x, overlayCanvas.height/2 - 12 + (button.y*15)*-1, 30)
}

addGameScope(new GameScope({
    name: 'Settings',
    type: SCOPES.MENU,
    subType: 'MENU',

    scopedUpdate: true,
    scopedRender: true,
    scopedKeboard: true,
    scopedMouse: true,
    scopedGamepad: true,

    vars: {
        buttons: []
    },

    gameInit: function () {
        if (debug) console.debug(`${this._name} initialized.`)

        this._vars.buttons.push({
            x: 0,
            y: -10,
            w: 10,
            h: 2,
            label: 'Back',
            bgColor: new Color(.7, .7, .7),
        })
    },

    gameUpdate: function () {
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
                            new Sound([.5,.5]).play(mousePos)
                            setGameScope("Main Menu")
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

    onEnter: function() {},

    onExit: function() {},
}))
