import Phaser from 'phaser-ce';

import { gameState } from '../currentGameState';

export default class extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);
  }

  update() {
    if (gameState.bosstime) {
      this.tilePosition.x -= 5;
    } else if (gameState.bosskilled) {
      this.tilePosition.x -= 15;
    } else {
      this.tilePosition.x -= 1;
    }
  }
}
