import Phaser from 'phaser-ce';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(config.gameWidth/800);// scale
    //this.angle = 90;
    game.physics.enable(this, Phaser.Physics.ARCADE);
  }
}
