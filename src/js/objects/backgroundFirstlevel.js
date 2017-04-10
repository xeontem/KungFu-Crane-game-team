import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';

export default class extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);
  }

  update() {
    if (!currentGameState.bosstime) this.tilePosition.x -= 1;
    else this.tilePosition.x -= 5;
  }
}
