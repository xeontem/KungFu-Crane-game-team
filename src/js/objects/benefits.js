import Phaser from 'phaser';
import { gameState } from '../currentGameState';
import { getCollectable } from '../sound/explosures';
import { paintInGreen, doNotSmoke1Player, doNotSmoke2Player } from '../loaders/animationsloader';

export class Benefit extends Phaser.GameObjects.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(gameState.gameWidth / 2800);// scale
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.events.onOutOfBounds.add(this.out, game);
  }

  update() {
    this.x -= gameState.enemiesSpeed;
  }

  out() {
    // -----------------------------out Of Bounds-----------------
    this.kill();
    gameState.score += 10000;
  }

  getHealth(player, benefit) {
    benefit.kill();
    getCollectable.apply(this);
    gameState.mainPlayerHP++;
    if (gameState.mainPlayerHP > 2) {
      doNotSmoke1Player.apply(this);
    }
    if (gameState.mainPlayerHP > 2) {
      doNotSmoke2Player.apply(this);
    }
    this.benefitHealth = null;
    paintInGreen.apply(this);
  }

  getScore(player, benefit) {
    benefit.kill();
    getCollectable.apply(this);
    gameState.score += 1000;
    gameState.levelscore += 1000;
    this.benefitScore = null;
  }

  getShield(player, benefit) {
    benefit.kill();
    getCollectable.apply(this);
    this.mainPlayerShield = this.add.sprite(this.mainPlayer.x, this.mainPlayer.y, 'shieldOn');
    this.mainPlayerShield.anchor.setTo(0.5);
    this.mainPlayerShield.scale.setTo(1.3 + gameState.gameWidth / 1324 - 1);
    this.mainPlayerShield.countdown = this.time.now;
    this.game.add.existing(this.mainPlayerShield);
    game.physics.enable(this.mainPlayerShield, Phaser.Physics.ARCADE);
    this.benefitShield = null;
  }

  getBurst(player, benefit) {
    benefit.kill();
    getCollectable.apply(this);
    gameState.mainPlayerSpeed += 120;
    this.benefitBurst = null;
  }

  getAmmo(player, benefit) {
    benefit.kill();
    getCollectable.apply(this);
    this.ammoCountdown = this.time.now;
    gameState.mainPlayerWeapon = game.rnd.integerInRange(2, 3);
  }
}
