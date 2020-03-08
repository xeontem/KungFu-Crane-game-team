import Phaser from 'phaser-ce/build/custom/phaser-split';

import { gameState, resetGameState } from '../currentGameState';
import { invokePauseMenu } from '../states/pauseMenu';
import { fire } from '../sound/explosures';

const invokeSound = (that) => {
  fire.apply(that);
};

export function applyNextActiveBtnIndex(isUp) {
  const currentActiveIndex = this.buttonInstances.reduce((activeInd, btn, index) => {
    return btn.frame === 1 ? index : activeInd;
  }, 0);
  const nextActiveIndex = isUp ? currentActiveIndex - 1 : currentActiveIndex + 1;
  this.loopedNextActiveIndex = (nextActiveIndex < 0)
    ? this.buttonInstances.length - 1
    : (nextActiveIndex > this.buttonInstances.length - 1)
      ? 0
      : nextActiveIndex;
  this.buttonInstances.forEach((btn, i) => {
    btn.frame = i === this.loopedNextActiveIndex ? 1 : 0;
  });
}

export const keyboardButtonsAdapter = level => ({
  leftUp: level.cursors.left.isUp,
  rightUp: level.cursors.right.isUp,
  upUp: level.cursors.up.isUp,
  downUp: level.cursors.down.isUp,
  leftDown: level.cursors.left.isDown,
  rightDown: level.cursors.right.isDown,
  upDown: level.cursors.up.isDown,
  downDown: level.cursors.down.isDown,
  changeWeaponDown: level.changeWeapon.isDown,
  fireButtonDown: level.fireButton.isDown,
  saveGame: level.saveGame.repeats === 1,
  loadGame: level.loadGame.repeats === 1,
  pauseMenu: level.openPauseMenu.repeats === 1,
});

let gamepadIndex = null;
export const getGamepad = () => navigator.getGamepads()[gamepadIndex];
window.addEventListener('gamepadconnected', (e) => {
  console.log('gamepad connected', e.gamepad);
  gamepadIndex = e.gamepad.index;
});

export const gamepadButtonsAdapter = level => {
  const gamepad = getGamepad();
  return ({
    leftUp: level.cursors.left.isUp,
    rightUp: level.cursors.right.isUp,
    upUp: level.cursors.up.isUp,
    downUp: level.cursors.down.isUp,
    leftDown: gamepad.buttons[14].pressed,
    rightDown: gamepad.buttons[15].pressed,
    upDown: gamepad.buttons[12].pressed,
    downDown: gamepad.buttons[13].pressed,
    changeWeaponDown: gamepad.buttons[0].pressed,
    fireButtonDown: gamepad.buttons[2].pressed,
    saveGame: gamepad.buttons[4].pressed,
    loadGame: gamepad.buttons[5].pressed,
    pauseMenu: gamepad.buttons[9].pressed,
  });
};

export const anyGamepadKeyPressed = () => {
  const gamepad = getGamepad();
  return gamepad && gamepad.buttons.some(b => b.pressed);
};

export const gamepadVibrate = () => {
  const gamepad = getGamepad();
  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect('dual-rumble', {
      startDelay: 0,
      duration: 1000,
      weakMagnitude: 1.0,
      strongMagnitude: 1.0,
    });
  }
};

export const toggleMouseControl = mouseState => {
  if (!game.paused) {
    gameState.mouseMoveEnabled = (mouseState === false || mouseState === false)
      ? mouseState : !gameState.mouseMoveEnabled;
    document.body.style.cursor = gameState.mouseMoveEnabled ? 'none' : 'default';
  }
};

export function setLevelInput() {
  this.cursors = game.input.keyboard.createCursorKeys();
  this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.changeWeapon = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  this.openPauseMenu = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  this.saveGame = game.input.keyboard.addKey(Phaser.Keyboard.F5);
  this.loadGame = game.input.keyboard.addKey(Phaser.Keyboard.F8);

  const move = () => {
    if (gameState.mouseMoveEnabled) {
      if (this.mainPlayer && this.mainPlayer.body && this.key === 'level') {
        if (game.physics.arcade.distanceToPointer(this.mainPlayer) > 14) {
          game.physics.arcade.moveToPointer(this.mainPlayer, gameState.mainPlayerSpeed);
        } else {
          this.mainPlayer.body.velocity.setTo(0, 0);
        }
      } else {
        toggleMouseControl(false);
        game.canvas.removeEventListener('click', toggleMouseControl);
        game.canvas.removeEventListener('pointermove', move);
      }
    }
  };

  game.canvas.addEventListener('click', toggleMouseControl);
  game.canvas.addEventListener('pointermove', move);
}

export const loadAndStartSavedGame = context => {
    resetGameState(JSON.parse(localStorage.getItem('GAME_STATE')));
    context.state.start('level');
    console.log('game loaded');
};

export const saveGame = () => {
    localStorage.setItem('GAME_STATE', JSON.stringify(gameState));
    console.log('game saved');
};

export function keysOn(buttons) {
  if (buttons.saveGame) {
    saveGame();
  }

  if (buttons.loadGame) {
    loadAndStartSavedGame(this);
  }

  if (buttons.leftUp) {
    this.exhaust1.scale.setTo(0.2);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust1.y = -15;
    this.exhaust2.y = 16;
  }
  if (buttons.rightUp) {
    this.exhaust1.scale.setTo(0.2);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust1.y = -16;
    this.exhaust2.y = 15;
  }
  if (buttons.upUp) {
    this.mainPlayer.animations.play('upBack', 30, false);
    if (gameState.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 38;
    } else if (gameState.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 19;
    } else {
      this.mainPlayer.frame = 0;
    }
  }
  if (buttons.downUp) {
    this.mainPlayer.animations.play('downBack', 30, false);
    if (gameState.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 38;
    } else if (gameState.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 19;
    } else {
      this.mainPlayer.frame = 0;
    }
  }
  if (buttons.leftDown) {
    this.mainPlayer.body.velocity.x = -gameState.mainPlayerSpeed;
    this.exhaust1.scale.setTo(0.1);
    this.exhaust2.scale.setTo(0.1);
    this.exhaust1.y = -17;
    this.exhaust2.y = 14;
  }
  if (buttons.rightDown) {
    this.mainPlayer.body.velocity.x = gameState.mainPlayerSpeed;
    this.exhaust1.scale.setTo(0.3);
    this.exhaust2.scale.setTo(0.3);
    this.exhaust1.y = -17;
    this.exhaust2.y = 15;
  }
  if (buttons.upDown) {
    this.mainPlayer.body.velocity.y = -gameState.mainPlayerSpeed;
    this.mainPlayer.animations.play('up', 30, false);
    if (gameState.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 47;
    } else if (gameState.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 28;
    } else {
      this.mainPlayer.frame = 9;
    }
  }
  if (buttons.downDown) {
    this.mainPlayer.body.velocity.y = gameState.mainPlayerSpeed;
    this.mainPlayer.animations.play('down', 30, false);
    if (gameState.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 56;
    } else if (gameState.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 37;
    } else {
      this.mainPlayer.frame = 18;
    }
  }
  if (buttons.changeWeaponDown) {
    if (gameState.currentWeapon < 3) {
      gameState.currentWeapon += 1;
    } else {
      gameState.currentWeapon = 1;
    }
    this.currentWeapon = this[`weapon${gameState.currentWeapon}`];
  }
  if (buttons.fireButtonDown && !gameState.mainPlayerKilled) {
    if (this.currentWeapon.multiple) {
      this.currentWeapon.weapon.forEach((gun) => {
        gun.fire();
      });
    } else {
      this.currentWeapon.weapon.fire();
    }
  }

  if (buttons.pauseMenu) {
    invokePauseMenu.apply(this);
  }
}
