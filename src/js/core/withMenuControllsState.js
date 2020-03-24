import Phaser from 'phaser';
import { getDebouncedGampedUpCheck, getDebouncedGampedDownCheck, getDebouncedKeyboardDownCheck, getDebouncedKeyboardUpCheck, getGamepad } from '../controls/controls';
import { gameState } from '../currentGameState';
import { BUTTONS, createButton, activeBtnStyle, inactiveBtnStyle } from './buttons';

export const KEYS = {
  UP: {
    DOWN_ONCE: 'UP_ONCE',
    UP_ONCE: 'UP_UP_ONCE',
    DOWN: 'UP_DOWN',
    UP: 'UP_UP',
    eventKey: 'ArrowUp',
    path: ['CURSORS', 'up'],
    gamepadKey: 12,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  DOWN: {
    DOWN_ONCE: 'DOWN_ONCE',
    UP_ONCE: 'DOWN_UP_ONCE',
    DOWN: 'DOWN_DOWN',
    UP: 'DOWN_UP',
    eventKey: 'ArrowDown',
    path: ['CURSORS', 'down'],
    gamepadKey: 13,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  LEFT: {
    DOWN_ONCE: 'LEFT_ONCE',
    UP_ONCE: 'LEFT_UP_ONCE',
    DOWN: 'LEFT_DOWN',
    UP: 'LEFT_UP',
    eventKey: 'ArrowLeft',
    path: ['CURSORS', 'left'],
    gamepadKey: 14,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  RIGHT: {
    DOWN_ONCE: 'RIGHT_ONCE',
    UP_ONCE: 'RIGHT_UP_ONCE',
    DOWN: 'RIGHT_DOWN',
    UP: 'RIGHT_UP',
    eventKey: 'ArrowRight',
    path: ['CURSORS', 'right'],
    gamepadKey: 15,
    constr: 'createCursorKeys',
    arg: undefined,
  },
  MENU: {
    DOWN_ONCE: 'MENU_ONCE',
    UP_ONCE: 'MENU_UP_ONCE',
    DOWN: 'MENU_DOWN',
    UP: 'MENU_UP',
    eventKey: 'Escape',
    path: ['MENU_BTN'],
    gamepadKey: 9,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.ESC,
  },
  CONFIRM: {
    DOWN_ONCE: 'CONFIRM_ONCE',
    UP_ONCE: 'CONFIRM_UP_ONCE',
    DOWN: 'CONFIRM_DOWN',
    UP: 'CONFIRM_UP',
    eventKey: 'Enter',
    path: ['CONFIRM_BTN'],
    gamepadKey: 2,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.ENTER,
  },
  FIRE: {
    DOWN_ONCE: 'FIRE_ONCE',
    UP_ONCE: 'FIRE_UP_ONCE',
    DOWN: 'FIRE_DOWN',
    UP: 'FIRE_UP',
    eventKey: 'Space',
    path: ['FIRE_BTN'],
    gamepadKey: 2,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.SPACEBAR,
  },
  SAVE: {
    DOWN_ONCE: 'SAVE_ONCE',
    UP_ONCE: '',
    DOWN: 'SAVE_DOWN',
    UP: 'SAVE_UP',
    eventKey: 'F5',
    path: ['SAVE_BTN'],
    gamepadKey: 4,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.F5,
  },
  LOAD: {
    DOWN_ONCE: 'LOAD_ONCE',
    UP_ONCE: 'LOAD_UP_ONCE',
    DOWN: 'LOAD_DOWN',
    UP: 'LOAD_UP',
    eventKey: 'F8',
    path: ['LOAD_BTN'],
    gamepadKey: 5,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.F8,
  },
  CHANGE_WEAPON: {
    DOWN_ONCE: 'CHANGE_WEAPON_ONCE',
    UP_ONCE: 'CHANGE_WEAPON_UP_ONCE',
    DOWN: 'CHANGE_WEAPON_DOWN',
    UP: 'CHANGE_WEAPON_UP',
    eventKey: 'Shift',
    path: ['CHANGE_WEAPON_BTN'],
    gamepadKey: 3,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.SHIFT,
  },
};

export class WithControlls extends Phaser.Scene {
  getGamepadBtnState(key, cfg) {
    const gamepad = getGamepad();
    return gamepad && (cfg.once
      ? this[`GAMEPAD_${cfg.dorection}_ONCE_${key}`](gamepad.buttons[KEYS[key].gamepadKey].pressed)
      : gamepad.buttons[KEYS[key].gamepadKey].pressed);
  }

  getKeyboardBtnState(key, cfg) {
    const btnState = KEYS[key].path.reduce((val, field) => val[field], this);
    return cfg.once ? this[`KEYBOARD_${cfg.direction}_ONCE_${key}`](btnState) : btnState[cfg.state];
  }

  preload(buttonList = [], y = gameState.gameHeight / 2) {
    this.buttonList = buttonList;
    this.yPos = y;
  }

  create() {
    // -------------------------------------- BUTTONS ----------------------------------------------
    this.activeBtnIndex = 0;
    this.isResumeAvailable = false;
    this.buttonInstances = this.buttonList.map((btnData, i) => {
      if (btnData.title === BUTTONS.RESUME.title) {
        this.isResumeAvailable = true;
      }
      const currentButton = createButton(
        btnData.title,
        this.scale.width / 2,
        this.yPos + (80 * i),
        btnData.handler,
        this.pointerover,
        this,
      );
      currentButton.setScale(gameState.gameHeight / 1080);
      currentButton.setOrigin(0.5);
      return currentButton;
    });

    // -------------------------------------- event handlers ---------------------------------------
    this.keydownHandler = null;

    Object.keys(KEYS).forEach(key => {
      this[`GAMEPAD_UP_ONCE_${key}`] = getDebouncedGampedUpCheck();
      this[`GAMEPAD_DOWN_ONCE_${key}`] = getDebouncedGampedDownCheck();
      this[`KEYBOARD_DOWN_ONCE_${key}`] = getDebouncedKeyboardDownCheck();
      this[`KEYBOARD_UP_ONCE_${key}`] = getDebouncedKeyboardUpCheck();

      if (!this[KEYS[key].path[0]]) {
        this[KEYS[key].path[0]] = this.input.keyboard[KEYS[key].constr](KEYS[key].arg);
      }
    });
  }

  update() {
    super.update();

    // keep activeBtnIndex synced with mouse and keyboard and gamepad
    if (this.buttonInstances.length) {
      this.buttonInstances.forEach((btn, i) => {
        if (i === this.activeBtnIndex) {
          btn.setStyle(activeBtnStyle);
        } else {
          btn.setStyle(inactiveBtnStyle);
        }
      });
    }

    if (this[KEYS.CONFIRM.DOWN_ONCE]) {
      this.buttonList[this.activeBtnIndex].handler.apply(this);
    }

    if (this[KEYS.UP.DOWN_ONCE] || this[KEYS.DOWN.DOWN_ONCE]) {
      const nextActiveIndex = this[KEYS.UP.DOWN_ONCE] ? this.activeBtnIndex - 1 : this.activeBtnIndex + 1;
      this.activeBtnIndex = (nextActiveIndex < 0)
        ? this.buttonInstances.length - 1
        : (nextActiveIndex > this.buttonInstances.length - 1)
          ? 0
          : nextActiveIndex;
    }

    if (this.isResumeAvailable && this[KEYS.MENU.DOWN_ONCE]) {
      resume.call(this);
    }

    if (game.paused && !this.keydownHandler) {
      this.keydownHandler = e => {
        const key = Object.keys(KEYS).find(key => KEYS[key].eventKey === e.key);
        this[`EVENT_HANDLER_${key}`] = true;
      };
      document.addEventListener('keydown', this.keydownHandler);
    } else if (!game.paused && this.keydownHandler) {
      this.removeHandlers();
    }

    Object.keys(KEYS).forEach(key => {
      [
        {
          key: KEYS[key].DOWN_ONCE,
          once: true,
          direction: 'DOWN',
          state: '',
        },
        {
          key: KEYS[key].UP_ONCE,
          once: true,
          direction: 'UP',
          state: '',
        },
        {
          key: KEYS[key].DOWN,
          direction: '',
          once: false,
          state: 'isDown',
        },
        {
          key: KEYS[key].UP,
          once: false,
          direction: '',
          state: 'isUp',
        },
      ].forEach(cfg => {
        const value = game.paused
          ? this[`EVENT_HANDLER_${key}`]
          : (this.getKeyboardBtnState(key, cfg) || this.getGamepadBtnState(key, cfg));
        this[cfg.key] = value;
      });

      this[`EVENT_HANDLER_${key}`] = false;
    });
  }

  pointerover(curBtn) {
    this.buttonInstances.forEach((btn, i) => {
      if (btn.text === curBtn.text) {
        this.activeBtnIndex = i;
      }
    });
  }

  removeHandlers() {
    document.removeEventListener('keydown', this.keydownHandler);
    this.keydownHandler = null;
  }
}
