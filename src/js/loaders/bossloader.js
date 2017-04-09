import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import Firstboss from '../objects/firstboss';
import config from '../config';

export default function () {
  if (this.boss && !this.bossWeapon) {
    this.bossWeapon = this.game.add.weapon(10, 'bullet');
    this.bossWeapon.bulletSpeed = 600;
    this.bossWeapon.fireRate = 100;
    this.bossWeapon.fireAngle = 180;
    this.bossWeapon.autofire = true;
    this.bossWeapon.trackSprite(this.boss, -80, 0, false);
    this.game.physics.enable(this.bossWeapon, Phaser.Physics.ARCADE);
    //--------------------------------------------------------------
  }
  if (!this.boss && currentGameState.bosstime) {
    this.boss = new Firstboss({
      game: this,
      x: config.gameWidth - 200,
      y: this.game.world.centerY,
      asset: 'boss',
    });
    this.game.add.existing(this.boss);
    const tween = this.add.tween(this.boss).to(
                                    { y: 200 },
                                    2000,
                                    Phaser.Easing.Linear.None,
                                    true,
                                    0,
                                    100,
                                    true);
  }
    if(this.boss)this.boss.HPinfo.text = `BOSS HP: ${this.boss.HP}`;
}
