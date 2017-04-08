import Phaser from 'phaser-ce';

export function weaponOn() {
      this.weapon = this.game.add.weapon(30, 'bullet');
      this.weapon.bulletSpeed = 600;
      this.weapon.fireRate = 100;
      this.weapon.fireAngle = 0;
      this.weapon.trackSprite(this.mainPlayer, 65, 26, false);
      this.game.physics.enable(this.weapon, Phaser.Physics.ARCADE);
}
