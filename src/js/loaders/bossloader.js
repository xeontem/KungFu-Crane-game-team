import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import Firstboss from '../objects/firstboss';


export default function (that) {
  if (that.boss) {
    that.bulletBoss.fireBullet.call(that);
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
