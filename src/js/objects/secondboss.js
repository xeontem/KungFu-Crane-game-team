import Phaser from 'phaser-ce';

import { gameState } from '../currentGameState';
import { gameState } from '../currentGameState';

export default class extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);
    this.y = -200;
    this.HPinfo = game.add.text(
      400,
      gameState.gameHeight - 50,
      `BOSS HP: ${this.HPinfo}`,
      { font: '32px Arial', fill: '#dddddd' });
    this.HPinfo.anchor.setTo(0.5);
    this.HP = gameState.firstBossHP;
  }

  spawn() {
    const boss = this.create(gameState.gameWidth, gameState.gameHeight / 2, 'enemy');
    boss.anchor.setTo(0.5);
    boss.scale.setTo(2 + gameState.gameWidth / 1024 - 1, 5 + gameState.gameHeight / 512 - 1);// scale
  }

  bossKiller(game, bullet, boss) {
    bullet.kill();
    if (game.boss.HP) {
      game.boss.HP--;
    } else {
      boss.kill();
      gameState.score += 1000;
      gameState.levelscore = 0;
      gameState.bosstime = false;
      gameState.bosskilled = true;
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
