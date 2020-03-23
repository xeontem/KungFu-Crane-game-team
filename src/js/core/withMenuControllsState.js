import Phaser from 'phaser';
import { getDebouncedCheck, getGamepad } from '../controls/controls';
import { gameState } from '../currentGameState';
import { applyNextActiveBtnIndex } from '../controls/controls';
import { BUTTONS } from './buttons';

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
    arg: Phaser.Input.Keyboard.KeyCodes.ESC,
  },
  CONFIRM: {
    ONCE: 'CONFIRM_ONCE',
    DOWN: 'CONFIRM_DOWN',
    UP: 'CONFIRM_UP',
    eventKey: 'Enter',
    path: ['CONFIRM_BTN'],
    gamepadKey: 2,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.ENTER,
  },
  FIRE: {
    ONCE: 'FIRE_ONCE',
    DOWN: 'FIRE_DOWN',
    UP: 'FIRE_UP',
    eventKey: 'Space',
    path: ['FIRE_BTN'],
    gamepadKey: 2,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.SPACEBAR,
  },
  SAVE: {
    ONCE: 'SAVE_ONCE',
    DOWN: 'SAVE_DOWN',
    UP: 'SAVE_UP',
    eventKey: 'F5',
    path: ['SAVE_BTN'],
    gamepadKey: 4,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.F5,
  },
  LOAD: {
    ONCE: 'LOAD_ONCE',
    DOWN: 'LOAD_DOWN',
    UP: 'LOAD_UP',
    eventKey: 'F8',
    path: ['LOAD_BTN'],
    gamepadKey: 5,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.F8,
  },
  CHANGE_WEAPON: {
    ONCE: 'CHANGE_WEAPON_ONCE',
    DOWN: 'CHANGE_WEAPON_DOWN',
    UP: 'CHANGE_WEAPON_UP',
    eventKey: 'Shift',
    path: ['CHANGE_WEAPON_BTN'],
    gamepadKey: 3,
    constr: 'addKey',
    arg: Phaser.Input.Keyboard.KeyCodes.SHIFT,
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

export class WithControlls extends Phaser.Scene {
  getKeyboardBtnState(key, state, once = false) {
    const btnState = KEYS[key].path.reduce((val, field) => val[field], this);
    return once ? btnState.repeats === 1 : btnState[state];
  }

  preload(buttonList = []) {
    this.buttonList = buttonList;
    this.buttonList.forEach(btnData => {
      console.log(this);
      this.load.spritesheet(btnData.textureName, btnData.texture, { frameWidth: 300, frameHeight: 80 });
    });
  }

  create() {
    // -------------------------------------- BUTTONS ----------------------------------------------
    this.loopedNextActiveIndex = 0;
    this.isResumeAvailable = false;
    this.buttonInstances = this.buttonList.map((btnData, i) => {
      if (btnData.textureName === BUTTONS.RESUME.textureName) {
        this.isResumeAvailable = true;
      }
      const currentButton = this.game.add.button(
        this.game.world.centerX,
        gameState.gameHeight - (80 * (this.buttonList.length - i)),
        btnData.textureName,
        btnData.handler,
        this,
        1,
        0,
        1,
      );
      currentButton.onInputOver.add(this.onInputOver, this);
      currentButton.scale.setTo(gameState.gameHeight / 1050);
      currentButton.anchor.setTo(0.5);
      return currentButton;
    });

    // -------------------------------------- event handlers ---------------------------------------
    this.keydownHandler = null;

    Object.keys(KEYS).forEach(key => {
      this[`GAMEPAD_ONCE_${key}`] = getDebouncedCheck();

      if (!this[KEYS[key].path[0]]) {
        this[KEYS[key].path[0]] = this.input.keyboard[KEYS[key].constr](KEYS[key].arg);
      }
    });
  }

  update() {
    super.update();

    // keep loopedNextActiveIndex synced with mouse and keyboard and gamepad
    if (this.buttonInstances.length) {
      this.buttonInstances[this.loopedNextActiveIndex].frame = 1;
      this.buttonInstances.forEach((btn, i) => {
        if (btn.frame && i !== this.loopedNextActiveIndex) {
          btn.frame = 0;
        }
      });
    }

    if (this[KEYS.CONFIRM.ONCE]) {
      this.buttonList[this.loopedNextActiveIndex].handler.apply(this);
    }

    if (this[KEYS.UP.ONCE]) {
      applyNextActiveBtnIndex.call(this, true);
    }

    if (this[KEYS.DOWN.ONCE]) {
      applyNextActiveBtnIndex.call(this, false);
    }

    if (this.isResumeAvailable && this[KEYS.MENU.ONCE]) {
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
          (game.paused ? this[`EVENT_HANDLER_${key}`] : this.getKeyboardBtnState(key, cfg.scene, cfg.once)) ||
          (gamepad && cfg.handler(gamepad.buttons[KEYS[key].gamepadKey].pressed));
      });

      this[`EVENT_HANDLER_${key}`] = false;
    });
  }

  onInputOver(curBtn, event) {
    this.buttonInstances.forEach((btn, i) => {
      if (btn.key === curBtn.key) {
        this.loopedNextActiveIndex = i;
      }
    });
  }

  removeHandlers() {
    document.removeEventListener('keydown', this.keydownHandler);
    this.keydownHandler = null;
  }
}
