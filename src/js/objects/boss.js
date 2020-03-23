import Phaser from 'phaser';
import { gameState } from '../currentGameState';

export default class extends Phaser.GameObjects.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.scale.setTo(1 + gameState.gameWidth / 1024 - 1);// scale
    this.HP = gameState.firstBossHP;
    this.HPinfo = game.add.text(
      gameState.gameWidth / 4.2,
      gameState.gameHeight - gameState.gameHeight / 21,
      `BOSS HP: ${this.HP} `,
      { font: `${gameState.gameHeight / 32.8}px Orbitron`, fill: '#dddddd' });
    this.HPinfo.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update() {
    if (this.x > gameState.gameWidth - 150) {
      this.x--;
    }
  }
}
