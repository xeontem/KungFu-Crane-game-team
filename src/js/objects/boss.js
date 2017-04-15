import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(1);// scale
    this.HP = config.firstBossHP;
    this.HPinfo = game.add.text(
      400,
      config.gameHeight - 50,
      `BOSS HP: ${this.HP} `,
      { font: '32px Bangers', fill: '#dddddd' });
    this.HPinfo.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update (){
  	if(this.x > config.gameWidth - 150) this.x--;
  }
}
