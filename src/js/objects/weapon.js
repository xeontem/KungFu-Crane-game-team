import Phaser from 'phaser-ce';
import { shot } from '../sound/explosures';
import config from '../config';

export function weaponOn() {
    this.weapon = this.game.add.weapon(30, 'bullet');
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 100;
    this.weapon.fireAngle = 0;
    this.weapon.trackSprite(this.mainPlayer, 65, 0, false);
    this.weapon.onFire.add(invokeSoundOnFire, this);
    this.game.physics.enable(this.weapon, Phaser.Physics.ARCADE);
    return {    weapon : this.weapon,
                multiple: false,
    };
}
export function threeWayWeapon() {
    this.gun1 = this.game.add.weapon(30, 'bullet');
    this.gun1.bulletSpeed = 600;
    this.gun1.fireRate = 60;
    this.gun1.fireAngle = 0;
    this.gun1.trackSprite(this.mainPlayer, 65, 0, false);
    this.gun1.onFire.add(invokeSoundOnFire, this);
    this.game.physics.enable(this.gun1, Phaser.Physics.ARCADE);
    //---------------------------------------------------------
    this.gun2 = this.game.add.weapon(30, 'bullet');
    this.gun2.bulletSpeed = 600;
    this.gun2.fireRate = 60;
    this.gun2.fireAngle = 45;
    this.gun2.trackSprite(this.mainPlayer, 65, 0, false);
    this.gun2.onFire.add(invokeSoundOnFire, this);
    this.game.physics.enable(this.gun2, Phaser.Physics.ARCADE);
    //---------------------------------------------------------
    this.gun3 = this.game.add.weapon(30, 'bullet');
    this.gun3.bulletSpeed = 600;
    this.gun3.fireRate = 60;
    this.gun3.fireAngle = 315;
    this.gun3.trackSprite(this.mainPlayer, 65, 0, false);
    this.gun3.onFire.add(invokeSoundOnFire, this);
    this.game.physics.enable(this.gun3, Phaser.Physics.ARCADE);

    return {    weapon : [ this.gun1, this.gun2, this.gun3 ],
                multiple: true,
    };
}

export function spreadWeapon() {
    this.spreadWeapon = this.game.add.weapon(30, 'bullet');
    this.spreadWeapon.bulletSpeed = 600;
    this.spreadWeapon.fireRate = 60;
    this.spreadWeapon.fireAngle = 0;
    this.spreadWeapon.bulletAngleVariance = 10;
    this.spreadWeapon.trackSprite(this.mainPlayer, 65, 0, false);
    this.spreadWeapon.onFire.add(invokeSoundOnFire, this);
    this.game.physics.enable(this.spreadWeapon, Phaser.Physics.ARCADE);

    return {    weapon : this.spreadWeapon,
                multiple: false,
    };
}


function invokeSoundOnFire() {
      shot.apply(this);
}


//-------




