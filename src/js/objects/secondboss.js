import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
  super(game, parent, name, addToStage, enableBody, physicsBodyType);
    this.y = -200;
    this.HPinfo = game.add.text(
      400,
      config.gameHeight - 50,
      `BOSS HP: ${this.HPinfo}`,
      { font: '32px Arial', fill: '#dddddd' });
    this.HPinfo.anchor.setTo(0.5);
    this.HP = config.firstBossHP;
  }

  spawn() {
    const boss = this.create(config.gameWidth, config.gameHeight / 2, 'enemy');
    boss.anchor.setTo(0.5);
    boss.scale.setTo(2 + config.gameWidth/1024 - 1, 5 + config.gameHeight/512 - 1);// scale
  }

  bossKiller(game, bullet, boss) {
    bullet.kill();
    if (game.boss.HP) {
      game.boss.HP--;
    } else {
      boss.kill();
      currentGameState.score += 1000;
      currentGameState.levelscore = 0;
      currentGameState.bosstime = false;
      currentGameState.bosskilled = true;
      game.winText = game.add.text(
        game.world.centerX,
        game.world.centerY,
        'Well Done!',
        { font: '32px Arial', fill: '#dddddd' });
      game.winText.anchor.setTo(0.5);
      game.boss.endLevel = game.time.now;
      game.winText.text = `${this.time.now}`;
    }
  }
}
