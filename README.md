## LittleJS Starter Kit

This starter kit and mini-framework for [LittleJS](https://github.com/KilledByAPixel/LittleJS) is intended to simplify the architecture for complex games.  It supports running multiple LittleJS games simultaneously (if desired) by moving the game logic into runtime modules called [GameScope](https://github.com/psema4/littlejs-starter-kit/blob/develop/src/GameScope.js)s and iterating through these scopes in the game loop.

## GameScope Example

For a minimalist example, see the [Blank](https://github.com/psema4/littlejs-starter-kit/blob/develop/src/scopes/blank.js) GameScope.

For a simple menu example, see the [MainMenu](https://github.com/psema4/littlejs-starter-kit/blob/develop/src/scopes/Main_Menu.js) GameScope.

## GameScope Flags

Several flags are available to customize how GameScopes are executed:

### Framework Enforced
* scopedUpdate: If true, a GameScope will only have it's update method called if it is the currently active scope. Set to false to keep a scope running in the background.
* scopedRender: If true, a GameScope will only have it's render method called if it is the currently active scope. Set to false if you want to keep rendering in the background.

### Convention

The following GameScope properties should be checked in your GameScope's `gameUpdate()` handlers:

* scopedKeyboard: If true, a GameScope should only process keyboard inputs when it is the active scope
* scopedMouse: If true, a GameScope should only process mouse inputs when it is the active scope (use in `gameUpdate()` handlers)
* scopedGamepad: If true, a GameScope should only process gamepad inputs when it is the active scope (use in `gameUpdate()` handlers)

## Initial Setup

Note: Requires Node.js

    git clone git@github.com:psema4/littlejs-starter-kit.git
    cd littlejs-starter-kit
    git checkout develop
    npm i

## Building & Running

Note: Requires Bash and Node.js

    npm run build

Or to build and run the development server:

    npm run server

and open a browser to http://localhost:8090/

## Other Considerations:

 *  Multiple tile/sprite sets
 *  Global, scoped timers & clocks
 *  Common library functions (see also gameEffects.js from the LittleJS platformer example for a nice background generator)


## Attributions

* [LittleJS Puzzle Example](https://github.com/KilledByAPixel/LittleJS/blob/main/game.js)
