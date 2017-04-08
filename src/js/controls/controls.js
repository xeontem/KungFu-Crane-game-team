import Phaser from 'phaser';

import currentGameState from '../currentGameState';
import mainPlayer from '../objects/mainPlayer';
import { fire } from '../sound/explosures';
import config from '../config';

export function setKeys() {
  this.cursors = this.input.keyboard.createCursorKeys();
  this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.game.canvas.addEventListener('mousedown', mouseIn);
}

export function keysOn() {
  if (this.cursors.left.isDown) {
    this.mainPlayer.body.velocity.x = -350;
  }
  if (this.cursors.right.isDown) {
    this.mainPlayer.body.velocity.x = 350;
  }
  if (this.cursors.up.isDown) {
    this.mainPlayer.body.velocity.y = -350;
  }
  if (this.cursors.down.isDown) {
    this.mainPlayer.body.velocity.y = 350;
  }
  if (this.fireButton.isDown) {
    this.bullets.fireBullet.call(this);
        // invokeSound(this);
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
