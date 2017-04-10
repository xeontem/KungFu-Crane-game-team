import Phaser from 'phaser-ce';
import config from '../config';
import { getCollectable } from '../sound/explosures';
import currentGameState from '../currentGameState';

export class Benefit extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(0.4);// scale
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
    getHealth(player, benefit) {
      benefit.kill();
      getCollectable.apply(this);
      config.mainPlayerHP++;
      this.benefitHealth = null;
    }

    getScore(player, benefit) {
      benefit.kill();
      getCollectable.apply(this);
      currentGameState.score += 1000;
      currentGameState.levelscore += 1000;
      this.benefitScore = null;
    }

    getShield(player, benefit) {
      benefit.kill();
      getCollectable.apply(this);
      this.mainPlayerShield = this.add.sprite(this.mainPlayer.x, this.mainPlayer.y, 'shieldOn');
      this.mainPlayerShield.anchor.setTo(0.5);
      this.mainPlayerShield.scale.setTo(1.3);
      this.mainPlayerShield.countdown = this.time.now;
      this.game.add.existing(this.mainPlayerShield);
      game.physics.enable(this.mainPlayerShield, Phaser.Physics.ARCADE);
      this.benefitShield = null;
    }
    getBurst(player, benefit) {
      benefit.kill();
      getCollectable.apply(this);
      config.mainPlayerSpeed += 120;
      this.benefitBurst = null;
    }
    getAmmo(player, benefit) {
      benefit.kill();
      getCollectable.apply(this);
      this.ammoCountdown = this.time.now;
      currentGameState.mainPlayerWeapon = game.rnd.integerInRange(2, 3);
    }
}
