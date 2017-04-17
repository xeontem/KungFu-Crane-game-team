import Phaser from 'phaser';

import currentGameState from '../currentGameState';
import { invokePauseMenu, resume } from '../states/pauseMenu';
import { fire } from '../sound/explosures';
import config from '../config';

export function setKeys() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.changeWeapon = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.openPauseMenu = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    let canvas = document.getElementsByTagName('canvas');
    canvas[0].addEventListener('click', mouseIn);
}

export function keysOn() {
    if (this.cursors.left.isUp) {
        this.exhaust1.scale.setTo(0.2);
        this.exhaust2.scale.setTo(0.2);
        this.exhaust1.y = -15;
        this.exhaust2.y = 16;
    }
    if (this.cursors.right.isUp) {
        this.exhaust1.scale.setTo(0.2);
        this.exhaust2.scale.setTo(0.2);
        this.exhaust1.y = -16;
        this.exhaust2.y = 15;
    }
    if (this.cursors.up.isUp) {
        this.mainPlayer.animations.play('upBack', 30, false);
        if (config.mainPlayerHP <= 1) {
            this.mainPlayer.frame = 38;
        }
        else if (config.mainPlayerHP <= 2) {
            this.mainPlayer.frame = 19;
        }
        else
            this.mainPlayer.frame = 0;
    }
    if (this.cursors.down.isUp) {
        this.mainPlayer.animations.play('downBack', 30, false);
        if (config.mainPlayerHP <= 1) {
            this.mainPlayer.frame = 38;
        }
        else if (config.mainPlayerHP <= 2) {
            this.mainPlayer.frame = 19;
        }
        else
            this.mainPlayer.frame = 0;
    }
    if (this.cursors.left.isDown) {
        this.mainPlayer.body.velocity.x = -config.mainPlayerSpeed;
        this.exhaust1.scale.setTo(0.1);
        this.exhaust2.scale.setTo(0.1);
        this.exhaust1.y = -17;
        this.exhaust2.y = 14;
    }
    if (this.cursors.right.isDown) {
        this.mainPlayer.body.velocity.x = config.mainPlayerSpeed;
        this.exhaust1.scale.setTo(0.3);
        this.exhaust2.scale.setTo(0.3);
        this.exhaust1.y = -17;
        this.exhaust2.y = 15;
    }
    if (this.cursors.up.isDown) {
        this.mainPlayer.body.velocity.y = -config.mainPlayerSpeed;
        this.mainPlayer.animations.play('up', 30, false);
        if (config.mainPlayerHP <= 1) {
            this.mainPlayer.frame = 47;
        }
        else if (config.mainPlayerHP <= 2) {
            this.mainPlayer.frame = 28;
        }
        else
            this.mainPlayer.frame = 9;
    }
    if (this.cursors.down.isDown) {
        this.mainPlayer.body.velocity.y = config.mainPlayerSpeed;
        this.mainPlayer.animations.play('down', 30, false);
        if (config.mainPlayerHP <= 1) {
            this.mainPlayer.frame = 56;
        }
        else if (config.mainPlayerHP <= 2) {
            this.mainPlayer.frame = 37;
        }
        else
            this.mainPlayer.frame = 18;
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
    if (this.fireButton.isDown && !currentGameState.mainPlayerKilled) {
        if(this.currentWeapon.multiple === false) {
        this.currentWeapon.weapon.fire();
        } else if (this.currentWeapon.multiple === true) {
            this.currentWeapon.weapon.forEach(function(gun) {
                gun.fire();
            });
        }
    }
    this.openPauseMenu.onDown.add(invokePauseMenu, this);
}

export function mouseOn() {
    if (config.onOff) {
        this.game.canvas.addEventListener(onpointermove, move(this));
    }
}

let move = function move(that) {
    if (that.game.physics.arcade.distanceToPointer(that.mainPlayer) > 14) {
        that.game.physics.arcade.moveToPointer(that.mainPlayer, config.mainPlayerSpeed);
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
