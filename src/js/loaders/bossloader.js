import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import Firstboss from '../objects/firstboss';


export default function (that) {
  if (that.boss) {
    that.bossWeapon = that.game.add.weapon(30, 'bullet');
    that.bossWeapon.bulletSpeed = 600;
    that.bossWeapon.fireRate = 100;
    that.bossWeapon.fireAngle = 180;
    that.bossWeapon.autofire = true;
    that.bossWeapon.trackSprite(that.boss, 0, 0, false);
    that.game.physics.enable(that.bossWeapon, Phaser.Physics.ARCADE);
    //--------------------------------------------------------------
    that.boss.HPinfo.text = `BOSS HP: ${that.boss.HP}`;
  }
  if (!that.boss && currentGameState.bosstime) {
    that.boss = new Firstboss({
      game: that,
      parent: null,
      name: 'enem',
      addToStage: true,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
    });
    that.game.add.existing(that.boss);
    that.boss.spawn();
    const tween = that.add.tween(that.boss).to(
                                    { y: 200 },
                                    2000,
                                    Phaser.Easing.Linear.None,
                                    true,
                                    0,
                                    100,
                                    true);


        // ---------------------------check hit the boss-----------------------------
  }
  if (that.boss) {
    that.physics.arcade.overlap(
                                    that.bullets,
                                    that.boss,
                                    that.boss.bossKiller.bind(that, that),
                                    null,
                                    that,
        );
  }
}
