import Phaser from 'phaser-ce';

export default class extends Phaser.Animation {
    constructor ({ game, parent, name, frameData, frames, frameRate, loopFirst, loopSecond }) {
        super(game, parent, name, frameData, frames, frameRate, loopFirst, loopSecond);
        //this.anchor.setTo(0.5);
        //this.outOfBoundsKill = true;
        //this.scale.setTo(0.8);// scale
        //this.angle = 90;
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

  update () {

  }
}
