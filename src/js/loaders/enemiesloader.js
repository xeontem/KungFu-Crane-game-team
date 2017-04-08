import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import enemy from '../objects/enemy';


export default function (that) {
  if (!that.enemies || that.enemies.x + that.enemies.width < -1024 || that.enemies.y + that.enemies.height < -1024 || that.enemies.y + that.enemies.height > 1024) {
    if (currentGameState.levelscore < currentGameState.limit) { // how much kill enemies
      that.enemies = new enemy({
        game: that,
        parent: null,
        name: 'enem',
        addToStage: true,
        enableBody: true,
        physicsBodyType: Phaser.Physics.ARCADE,
      });
      that.game.add.existing(that.enemies);
    // -----------------------------apply position enemies to its behavior----------------
      if (that.enemies.move === 3) that.enemies.pos = that.game.rnd.integerInRange(3, 8);// go down
      else if (that.enemies.move === 4) that.enemies.pos = that.game.rnd.integerInRange(1, 6);// go up
      else that.enemies.pos = game.rnd.integerInRange(1, 8);
      that.enemies[`position${that.enemies.pos}`]();// this works
                // ----------------------------------destroy sprites if fly away
      for (let i = 0; i < that.enemies.children.length; i++) {
        if (that.enemies.x < -game.width - 300) {
          that.enemies.children[i].kill();
        }
      }
                //------------------------------------------------------------
    } else if (that.enemies.x < -game.width - 250) {
      currentGameState.bosstime = true;
    }
  }
  that.physics.arcade.overlap(
                                    that.bullets,
                                    that.enemies,
                                    that.enemies.enemyKiller.bind(that, that),
                                    null,
                                    that,
        );
}
