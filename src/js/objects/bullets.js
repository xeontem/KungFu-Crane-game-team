import Phaser from 'phaser-ce';

export default class extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);
    this.bulletTime = 0;
    this.createMultiple(30, 'bullet');
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 1);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
  }

  update() {

  }

  fireBullet() {
    if (this.time.now > this.bullets.bulletTime) {
      this.bullet = this.bullets.getFirstExists(false);

      if (this.bullet) {
        this.bullet.reset(this.mainPlayer.x + 60, this.mainPlayer.y + 2);
        this.bullet.body.velocity.x = 800;
        this.bullets.bulletTime = this.time.now + 200;
      }
    }
  }
}
