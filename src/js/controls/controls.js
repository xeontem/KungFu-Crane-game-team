import Phaser from 'phaser';

import currentGameState from '../currentGameState';
import mainPlayer from '../objects/mainPlayer';
import { fire } from '../sound/explosures';
import config from '../config';

export function setKeys() {
  this.cursors = this.input.keyboard.createCursorKeys();
  this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.changeWeapon = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  let canvas = document.getElementsByTagName('canvas');
  canvas[0].addEventListener('click', mouseIn);
}

export function keysOn() {

  if (this.cursors.left.isUp) {
    this.exhaust1.scale.setTo(0.2);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust1.y = 7;
    this.exhaust2.y = 38;
  }
  if (this.cursors.right.isUp) {
    this.exhaust1.scale.setTo(0.2);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust1.y = 7;
    this.exhaust2.y = 38;
  }
  if (this.cursors.left.isDown) {
    this.mainPlayer.body.velocity.x = -350;
    this.exhaust1.scale.setTo(0.1);
    this.exhaust2.scale.setTo(0.1);
    this.exhaust1.y = 8;
    this.exhaust2.y = 39;
  }
  if (this.cursors.right.isDown) {
    this.mainPlayer.body.velocity.x = 350;
    this.exhaust1.scale.setTo(0.3);
    this.exhaust2.scale.setTo(0.3);
    this.exhaust1.y = 6;
    this.exhaust2.y = 37;
  }
  if (this.cursors.up.isDown) {
    this.mainPlayer.body.velocity.y = -350;
  }
  if (this.cursors.down.isDown) {
    this.mainPlayer.body.velocity.y = 350;
  }
  if (this.changeWeapon.isDown) {
      if(config.weapons) {
          if(config.currentWeapon < config.weapons.length) {
            this.currentWeapon = config.weapons[config.currentWeapon++];
          } else {
            config.currentWeapon = 0;
            this.currentWeapon = config.weapons[config.currentWeapon];
          }
      }
  }
  if (this.fireButton.isDown) {
    if(this.currentWeapon.multiple === false) {
      this.currentWeapon.weapon.fire();
    } else if (this.currentWeapon.multiple === true) {
      this.currentWeapon.weapon.forEach(function(gun) {
         gun.fire();
      });
    }
  }
}

export function mouseOn() {
  if (config.onOff) {
    this.game.canvas.addEventListener(onpointermove, move(this));
  }
}

let move = function move(that) {
  if (that.game.physics.arcade.distanceToPointer(that.mainPlayer) > 14) {
    that.game.physics.arcade.moveToPointer(that.mainPlayer, 350);
  } else {
    that.mainPlayer.body.velocity.setTo(0, 0);
  }
};

function mouseIn() {
  if (config.onOff === false) {
    config.onOff = true;
    document.getElementById('game').style.cursor = 'none';
  } else {
    config.onOff = false;
    document.getElementById('game').style.cursor = 'default';
  }
}

function invokeSound(that) {
  fire.apply(that);
}
