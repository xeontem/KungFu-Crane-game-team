import Phaser from 'phaser';

import currentGameState from '../currentGameState';
import { invokePauseMenu, resume } from '../states/pauseMenu';
import { fire } from '../sound/explosures';
import config from '../config';

const move = that => {
  if (config.onOff) {
    if (game.physics.arcade.distanceToPointer(that.mainPlayer) > 14) {
      game.physics.arcade.moveToPointer(that.mainPlayer, config.mainPlayerSpeed);
    } else {
      that.mainPlayer.body.velocity.setTo(0, 0);
    }
  }
};

const mouseIn = () => {
  document.body.style.cursor = config.onOff ? 'default' : 'none';
  config.onOff = !config.onOff;
};

const invokeSound = that => {
  fire.apply(that);
};

export const keyboardButtonsAdapter = level => {
  return {
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
  };
};

export let gamepad;
window.addEventListener('gamepadconnected', e => {
  gamepad = e.gamepad;
});

export const gamepadButtonsAdapter = level => {
  return {
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
  };
};

export const anyGamepadKeyPressed = () => gamepad && gamepad.buttons.some(b => b.pressed);

export const gamepadVibrate = () => {
  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect('dual-rumble', {
      startDelat: 0,
      duration: 1000,
      weakMagnitude: 1.0,
      strongMagnitude: 1.0,
    });
  }
};

export function setKeys() {
  this.cursors = this.input.keyboard.createCursorKeys();
  this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.changeWeapon = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  this.openPauseMenu = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

  game.canvas.addEventListener('click', mouseIn);
  game.canvas.addEventListener('pointermove', () => move(this));
}

export function keysOn(buttons) {
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
    if (config.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 38;
    } else if (config.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 19;
    } else {
      this.mainPlayer.frame = 0;
    }
  }
  if (buttons.downUp) {
    this.mainPlayer.animations.play('downBack', 30, false);
    if (config.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 38;
    } else if (config.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 19;
    } else {
      this.mainPlayer.frame = 0;
    }
  }
  if (buttons.leftDown) {
    this.mainPlayer.body.velocity.x = -config.mainPlayerSpeed;
    this.exhaust1.scale.setTo(0.1);
    this.exhaust2.scale.setTo(0.1);
    this.exhaust1.y = -17;
    this.exhaust2.y = 14;
  }
  if (buttons.rightDown) {
    this.mainPlayer.body.velocity.x = config.mainPlayerSpeed;
    this.exhaust1.scale.setTo(0.3);
    this.exhaust2.scale.setTo(0.3);
    this.exhaust1.y = -17;
    this.exhaust2.y = 15;
  }
  if (buttons.upDown) {
    this.mainPlayer.body.velocity.y = -config.mainPlayerSpeed;
    this.mainPlayer.animations.play('up', 30, false);
    if (config.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 47;
    } else if (config.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 28;
    } else {
      this.mainPlayer.frame = 9;
    }
  }
  if (buttons.downDown) {
    this.mainPlayer.body.velocity.y = config.mainPlayerSpeed;
    this.mainPlayer.animations.play('down', 30, false);
    if (config.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 56;
    } else if (config.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 37;
    } else {
      this.mainPlayer.frame = 18;
    }
  }
  if (buttons.changeWeaponDown) {
    if (config.weapons) {
      if (config.currentWeapon < config.weapons.length) {
        this.currentWeapon = config.weapons[config.currentWeapon++];
      } else {
        config.currentWeapon = 0;
        this.currentWeapon = config.weapons[config.currentWeapon];
      }
    }
  }
  if (buttons.fireButtonDown && !currentGameState.mainPlayerKilled) {
    if (this.currentWeapon.multiple === false) {
      this.currentWeapon.weapon.fire();
    } else if (this.currentWeapon.multiple === true) {
      this.currentWeapon.weapon.forEach(gun => {
        gun.fire();
      });
    }
  }
  this.openPauseMenu.onDown.add(invokePauseMenu, this);
}
