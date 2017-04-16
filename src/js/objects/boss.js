import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(1 + config.gameWidth/1024 - 1);// scale
    this.HP = config.firstBossHP;
    this.HPinfo = game.add.text(
      config.gameWidth/4.2,
      config.gameHeight - config.gameHeight/21,
      `BOSS HP: ${this.HP} `,
      { font: `${config.gameHeight/32.8}px Orbitron`, fill: '#dddddd' });
    this.HPinfo.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update (){
  	if(this.x > config.gameWidth - 150) this.x--;
  }
}
