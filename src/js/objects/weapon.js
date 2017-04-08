import Phaser from 'phaser-ce';

export function weaponOn() {
      this.weapon = this.game.add.weapon(30, 'bullet');
      this.weapon.bulletSpeed = 600;
      this.weapon.fireRate = 100;
      this.weapon.fireAngle = 0;
      this.weapon.trackSprite(this.mainPlayer, 65, 26, false);
      this.game.physics.enable(this.weapon, Phaser.Physics.ARCADE);

      // this.weapon2 = this.game.add.weapon(30, 'bullet');
      // this.weapon2.bulletSpeed = 600;
      // this.weapon2.fireRate = 100;
      // this.weapon2.fireAngle = 0;
      // this.weapon2.trackSprite(this.mainPlayer, 65, 40, false);
      // this.game.physics.enable(this.weapon2, Phaser.Physics.ARCADE);
}

// export function bossWeaponOn() {
//       this.bossWeapon = this.game.add.weapon(30, 'bullet');
//       this.bossWeapon.bulletSpeed = 500;
//       this.bossWeapon.fireRate = 50;
//       this.bossWeapon.fireAngle = 180;
//       this.bossWeapon.trackSprite(this.mainPlayer, 0, 0, false);
//       this.game.physics.enable(this.bossWeapon, Phaser.Physics.ARCADE);
// }
