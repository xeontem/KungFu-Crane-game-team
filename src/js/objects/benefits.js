import Phaser from 'phaser-ce';
import config from '../config';
import currentGameState from '../currentGameState';

export class Benefit extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(0.3);// scale
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.events.onOutOfBounds.add(this.out, game);
  }

  update() {
    this.x -= config.enemiesSpeed;
  }
  //-----------------------------out Of Bounds-----------------
  out(){
    this.kill();
    currentGameState.score += 10000;
  }
  //-----------------------------------------------------------
  getHealth(player, benefit){
    benefit.kill();
    this.mainPlayer.HP++;
    this.benefitHealth = null;
  }
  getShield(player, benefit){
    benefit.kill();
    this.mainPlayer.HP++;
    this.health = null;
  }
  getScore(player, benefit){
    benefit.kill();
    currentGameState.score += 1000;
    currentGameState.levelscore += 1000;
    this.benefitScore = null;
  }
}
