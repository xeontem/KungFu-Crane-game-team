import Phaser from 'phaser-ce';
import { getDebouncedCheck, getGamepad } from '../controls/controls';

export const KEYS = {
  UP: {
    ONCE: 'UP_ONCE',
    DOWN: 'UP_DOWN',
    UP: 'UP_UP',
    eventKey: 'ArrowUp',
    path: ['CURSORS', 'up'],
    gamepadKey: 12,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  DOWN: {
    ONCE: 'DOWN_ONCE',
    DOWN: 'DOWN_DOWN',
    UP: 'DOWN_UP',
    eventKey: 'ArrowDown',
    path: ['CURSORS', 'down'],
    gamepadKey: 13,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  LEFT: {
    ONCE: 'LEFT_ONCE',
    DOWN: 'LEFT_DOWN',
    UP: 'LEFT_UP',
    eventKey: 'ArrowLeft',
    path: ['CURSORS', 'left'],
    gamepadKey: 14,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  RIGHT: {
    ONCE: 'RIGHT_ONCE',
    DOWN: 'RIGHT_DOWN',
    UP: 'RIGHT_UP',
    eventKey: 'ArrowRight',
    path: ['CURSORS', 'right'],
    gamepadKey: 15,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  MENU: {
    ONCE: 'MENU_ONCE',
    DOWN: 'MENU_DOWN',
    UP: 'MENU_UP',
    eventKey: 'Escape',
    path: ['MENU_BTN'],
    gamepadKey: 9,
    constr: 'addKey',
    arg: Phaser.Keyboard.ESC,
  },
  CONFIRM: {
    ONCE: 'CONFIRM_ONCE',
    DOWN: 'CONFIRM_DOWN',
    UP: 'CONFIRM_UP',
    eventKey: 'Enter',
    path: ['CONFIRM_BTN'],
    gamepadKey: 2,
    constr: 'addKey',
    arg: Phaser.Keyboard.ENTER,
  },
  FIRE: {
    ONCE: 'FIRE_ONCE',
    DOWN: 'FIRE_DOWN',
    UP: 'FIRE_UP',
    eventKey: 'Space',
    path: ['FIRE_BTN'],
    gamepadKey: 2,
    constr: 'addKey',
    arg: Phaser.Keyboard.SPACEBAR,
  },
  SAVE: {
    ONCE: 'SAVE_ONCE',
    DOWN: 'SAVE_DOWN',
    UP: 'SAVE_UP',
    eventKey: 'F5',
    path: ['SAVE_BTN'],
    gamepadKey: 4,
    constr: 'addKey',
    arg: Phaser.Keyboard.F5,
  },
  LOAD: {
    ONCE: 'LOAD_ONCE',
    DOWN: 'LOAD_DOWN',
    UP: 'LOAD_UP',
    eventKey: 'F8',
    path: ['LOAD_BTN'],
    gamepadKey: 5,
    constr: 'addKey',
    arg: Phaser.Keyboard.F8,
  },
  CHANGE_WEAPON: {
    ONCE: 'CHANGE_WEAPON_ONCE',
    DOWN: 'CHANGE_WEAPON_DOWN',
    UP: 'CHANGE_WEAPON_UP',
    eventKey: 'Shift',
    path: ['CHANGE_WEAPON_BTN'],
    gamepadKey: 3,
    constr: 'addKey',
    arg: Phaser.Keyboard.SHIFT,
  },
};

export const LIVE = {
  UP: {
    KEY: 'UP',
    eventKey: 'ArrowUp',
    path: ['CURSORS', 'up'],
    gamepadKey: 12,
    constr: 'createCursorKeys',
    arg: undefined,
  },
};

export class WithControlls extends Phaser.State {
  getKeyboardBtnState(key, state, once = false) {
    const btnState = KEYS[key].path.reduce((val, field) => val[field], this);
    return once ? btnState.repeats === 1 : btnState[state];
  }

  create() {
    super.create();
    this.keydownHandler = null;

    Object.keys(KEYS).forEach(key => {
      this[`GAMEPAD_ONCE_${key}`] = getDebouncedCheck();

      if (!this[KEYS[key].path[0]]) {
        this[KEYS[key].path[0]] = game.input.keyboard[KEYS[key].constr](KEYS[key].arg);
      }
    });
  }

  update() {
    super.update();

    if (game.paused && !this.keydownHandler) {
      this.keydownHandler = e => {
        const key = Object.keys(KEYS).find(key => KEYS[key].eventKey === e.key);
        this[`EVENT_HANDLER_${key}`] = true;
      };
      document.addEventListener('keydown', this.keydownHandler);
    } else if (!game.paused && this.keydownHandler) {
      this.removeHandlers();
    }

    const gamepad = getGamepad();

    Object.keys(KEYS).forEach(key => {

      [
        {
          key: KEYS[key].ONCE,
          once: true,
          state: '',
          handler: this[`GAMEPAD_ONCE_${key}`],
        },
        {
          key: KEYS[key].DOWN,
          once: false,
          state: 'isDown',
          handler: x => x,
        },
        {
          key: KEYS[key].UP,
          once: false,
          state: 'isUp',
          handler: x => x,
        },
      ].forEach(cfg => {
        this[cfg.key] =
          (game.paused ? this[`EVENT_HANDLER_${key}`] : this.getKeyboardBtnState(key, cfg.state, cfg.once)) ||
          (gamepad && cfg.handler(gamepad.buttons[KEYS[key].gamepadKey].pressed));
      });

      this[`EVENT_HANDLER_${key}`] = false;
    });
  }

  removeHandlers() {
    document.removeEventListener('keydown', this.keydownHandler);
    this.keydownHandler = null;
  }
}
