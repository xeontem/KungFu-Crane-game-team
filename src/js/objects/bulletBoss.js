import Phaser from 'phaser-ce';

import config from '../config';

export default class extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);
    this.bulletTime = 0;
    this.createMultiple(10, 'bullet');
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 1);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
  }

  update() {

  }

  fireBullet() {
    if (this.time.now > this.bulletBoss.bulletTime) {
      this.bulletB = this.bulletBoss.getFirstExists(false);

      if (this.bulletB) {
        this.bulletB.reset(this.boss.x + config.gameWidth, this.boss.y + (config.gameHeight / 2));
        this.bulletB.body.velocity.x = -800;
        this.bulletBoss.bulletTime = this.time.now + 300;
      }
    }
  }
}
