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
